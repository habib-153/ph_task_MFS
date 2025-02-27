import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt_access_secret: process.env.ACCESS_TOKEN_SECRET,
  jwt_access_expires_in: process.env.JWT_EXPIRE,
  jwt_refresh_expires_in: process.env.JWT_EXPIRE_REFRESH,
  jwt_refresh_secret: process.env.REFRESH_TOKEN_SECRET,
  default_password: process.env.DEFAULT_PASS,
  NODE_ENV: process.env.NODE_ENV,
  cloudinary_cloud_name: process.env.CLOUDINARY_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
  RESET_PASS_UI_LINK: process.env.RESET_PASS_UI_LINK,
  ADMIN_PHONE: process.env.ADMIN_PHONE,
};
