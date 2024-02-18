import { registerAs } from '@nestjs/config';

export default registerAs('pagination', () => ({
  default_page_size: 25,
  default_page_number: 0,
  max_page_size: 100,
}));
