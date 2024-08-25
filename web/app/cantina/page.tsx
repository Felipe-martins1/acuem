'use client';

import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

const cards = [
  {
    title: 'Pedidos',
    dataKey: '60',
  },
  {
    title: 'Pedidos',
    dataKey: '60',
  },
  {
    title: 'Pedidos',
    dataKey: '60',
  },
  {
    title: 'Pedidos',
    dataKey: '60',
  },
];

const data = Array.from({ length: 30 }).map((_, index) => ({
  day: index + 1,
  value: Math.floor(Math.random() * 40),
}));

const pedidosPorPeriodo = [
  {
    title: 'Total',
    value: 200,
  },
  {
    title: 'Total',
    value: 200,
  },
  {
    title: 'Total',
    value: 200,
  },
  {
    title: 'Total',
    value: 200,
  },
  {
    title: 'Total',
    value: 200,
  },
];

export default function Home() {
  return (
    <section className="pb-6">
      <div className="mb-8">
        <p className="text-gray-500 mb-4">Monitoramento de pedidos</p>
        <div className="flex items-stretch justify-between gap-4 flex-wrap">
          {cards.map(card => (
            <Card className="min-w-[200px] flex-1 p-2">
              <CardHeader className="text-gray-500 justify-center">
                Pedidos
              </CardHeader>
              <CardBody className="text-3xl font-bold text-center">60</CardBody>
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
              <LineChart width={900} height={500} data={data}>
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
                <XAxis dataKey="day" />
                <YAxis dataKey="value" />
              </LineChart>
            </div>
            <div className="flex flex-1 flex-col justify-between min-w-[200px] border-l-1">
              {pedidosPorPeriodo.map(item => (
                <div className="border-b-1 pb-4 text-center p-6">
                  <p className="font-semibold text-lg text-gray-500">
                    {item.title}
                  </p>
                  <span className="font-bold text-xl">{item.value}</span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </section>
  );
}
