import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Books4Kids Application',
    short_name: 'Books4Kids App',
    description:
      'Books4Kids store of Russian books for kids',
    start_url: '/',
    background_color: '#fff',
    theme_color: '#fff',
    display: 'standalone',
    icons: [
      // {
      //   src: '/img/icon.svg',
      //   sizes: '196x196 512x512 144x144 192x192 128x128 120x120 180x180',
      //   type: 'image/svg',
      //   purpose: 'maskable',
      // },
      // {
      //   src: '/img/logo.png',
      //   sizes: '196x196 512x512 144x144 192x192 128x128 120x120 180x180',
      //   type: 'image/png',
      //   purpose: 'any',
      // },
    ],
  }
}
