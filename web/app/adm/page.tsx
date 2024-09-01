'use client';

import { Loader } from '@/components/loader';
import StoreService from '@/service/store.service';
import { Purchase } from '@/types/api';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const cards = (purchases: Purchase[]) => [
  {
    title: 'Total',
    data: purchases.length,
  },
  {
    title: 'Manhã',
    data: purchases.filter(value => {
      const hour = new Date(value.date).getHours();
      return hour >= 6 && hour < 12;
    }).length,
  },
  {
    title: 'Tarde',
    data: purchases.filter(value => {
      const hour = new Date(value.date).getHours();
      return hour >= 12 && hour < 18;
    }).length,
  },
  {
    title: 'Noite',
    data: purchases.filter(value => {
      const hour = new Date(value.date).getHours();
      return hour >= 18 || hour < 6;
    }).length,
  },
];

export default function Home() {
  const { data, isLoading } = useQuery({
    queryKey: ['dashboard'],
    queryFn: () => {
      return StoreService.findDashboard(1);
    },
    refetchInterval: Infinity,
    retry: false,
  });

  const groupByDay = (purchases: Purchase[]) => {
    const today = new Date();
    const datesOfMonth = new Date(
      today.getMonth(),
      today.getFullYear(),
      0,
    ).getDate();
    const startArray = Array.from({ length: datesOfMonth }).map((_, index) => ({
      day: index + 1,
      total: 0,
    }));

    return purchases.reduce((acc, purchase) => {
      const purchaseDate = new Date(purchase.date);
      const day = purchaseDate.getDate();

      const existingDay = acc.find(item => item.day === day);

      if (existingDay) {
        existingDay.total += 1;
      } else {
        acc.push({ day, total: 1 });
      }

      return acc;
    }, startArray);
  };

  return (
    <section className="pb-6">
      <Loader loading={isLoading} />
      <div className="mb-8">
        <p className="text-gray-500 mb-4">Monitoramento de pedidos</p>
        <div className="flex items-stretch justify-between gap-4 flex-wrap">
          {cards(data?.purchasesDay || []).map(card => (
            <Card className="min-w-[200px] flex-1 p-2">
              <CardHeader className="text-gray-500 justify-center">
                {card.title}
              </CardHeader>
              <CardBody className="text-3xl font-bold text-center">
                {card.data}
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
      <div>
        <p className="text-gray-500 mb-4">Relatório do mês</p>
        <Card>
          <CardBody className="flex-row items-stretch gap-4 py-0 px-0 flex-wrap">
            <div className="flex-1 p-6">
              <p className="mb-4">Outubro</p>

              <LineChart
                width={900}
                height={500}
                data={groupByDay(data?.purchasesMonth || [])}
              >
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="total" stroke="#8884d8" />
                <XAxis dataKey="day" name="Dia" />

                <YAxis dataKey="total" name="Total" />
              </LineChart>
            </div>
            <div className="flex flex-1 flex-col justify-between min-w-[200px] border-l-1">
              {cards(data?.purchasesMonth || []).map(item => (
                <div className="border-b-1 pb-4 text-center p-6">
                  <p className="font-semibold text-lg text-gray-500">
                    {item.title}
                  </p>
                  <span className="font-bold text-xl">{item.data}</span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </section>
  );
}
