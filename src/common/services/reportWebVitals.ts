import { ReportHandler } from 'web-vitals'

// inspired from https://github.com/facebook/create-react-app/blob/main/packages/cra-template-typescript/template/src/reportWebVitals.ts
const reportWebVitals = (reportHandler?: ReportHandler) => {
  if (reportHandler && reportHandler instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      console.log('Info about Web vitals from https://web.dev/vitals/:')
      console.log('Cumulative Layout Shift (CLS) should be < 0.1')
      console.log('First Input Delay (FID) should be < 100 milliseconds')
      console.log('Largest Contentful Paint (FCP) should be < 1.8 seconds')
      console.log('Largest Contentful Paint (LCP) should be < 2.5 seconds')
      getCLS(reportHandler)
      getFID(reportHandler)
      getFCP(reportHandler)
      getLCP(reportHandler)
      getTTFB(reportHandler)
    })
  }
}

export default reportWebVitals
