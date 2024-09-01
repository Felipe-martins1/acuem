import { University } from '@/types/api';
import BaseService from './baseService';

const resource = 'universities';

const base = BaseService<University>(resource);

const UniversityService = {
  ...base,
};

export default UniversityService;
