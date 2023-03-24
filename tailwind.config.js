import tailwindTypography from '@tailwindcss/typography'
import rippleui from 'rippleui'
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  theme: {
    extend: {
      colors: {
        primary: defaultTheme.colors.green,
        'white-rgba': 'rgba(255, 255, 255, 0.8)'
      },
      fontFamily: {
        sans: ['"Roboto Slab"']
      }
    }
  },
  plugins: [tailwindTypography, rippleui]
}
