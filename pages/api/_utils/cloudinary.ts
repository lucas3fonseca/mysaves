import { v2 as cloudinary } from 'cloudinary'

import { settings } from '../settings'

cloudinary.config({ 
  cloud_name: settings.cloudinaryCloudName,
  api_key: settings.cloudinaryApiKey,
  api_secret: settings.cloudinaryApiSecret,
  secure: true,
});

export default cloudinary
