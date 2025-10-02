/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    optimizePackageImports: [
      'lucide-react', 
      'class-variance-authority',
      'clsx',
      'tailwind-merge'
    ],
    cssChunking: "loose", // ✅ оставляем — объединяет CSS
  },
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.externals = {
        ...config.externals,
        'nodemailer': 'nodemailer'
      };

      // 🎯 МИНИМИЗИРУЕМ ЧАНКИ → 1 ИЛИ 2 ФАЙЛА МАКСИМУМ
      config.optimization = {
        ...config.optimization,
        runtimeChunk: false, // ← объединяем runtime с основным чанком
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: 1,   // ← только 1 initial чанк
          maxAsyncRequests: 1,     // ← только 1 асинхронный чанк
          minSize: 0,              // ← объединяем даже мелкие модули
          cacheGroups: {
            default: false,        // ← отключаем дефолтные группы
            vendors: false,        // ← отключаем vendors
            // Создаём одну группу — всё в один файл
            all: {
              test: /.*/,
              name: 'bundle',
              chunks: 'all',
              enforce: true,       // ← принудительно объединяем всё
            },
          },
        },
        minimize: true,
        concatenateModules: true, // ← объединяем модули на уровне scope
      };
    }
    return config;
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  swcMinify: true,
  reactStrictMode: false,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
