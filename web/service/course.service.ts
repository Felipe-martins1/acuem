import { UniversityCourse } from '@/types/api';
import BaseService from './baseService';

const resource = 'university-courses';

const base = BaseService<UniversityCourse>(resource);

const UniversityCourseService = {
  ...base,
};

export default UniversityCourseService;
