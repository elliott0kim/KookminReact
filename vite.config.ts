import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    commonjsOptions: {
      ignoreTryCatch: false, // TS 오류를 무시하고 빌드
    }
  },
  server: {
    proxy: {
      '/back': {
        target: 'https://www.coweef.com', // 백엔드 서버 주소
        changeOrigin: true,              // 원본 요청 헤더를 백엔드 주소로 변경
        secure: false,                   // HTTPS 인증서 무시
        rewrite: (path) => path.replace(/^\/back/, '/back'), // 경로 그대로 유지
      },
    },
  }
})
