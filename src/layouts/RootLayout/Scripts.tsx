import Script from "next/script";
import { CONFIG } from "site.config";

const Scripts: React.FC = () => (
  <>
    {CONFIG?.googleAnalytics?.enable === true && (
      <>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${CONFIG.googleAnalytics.config.measurementId}`}
        />
        <Script strategy="lazyOnload" id="ga">
          {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${CONFIG.googleAnalytics.config.measurementId}', {
              page_path: window.location.pathname,
            });`}
        </Script>
      </>
    )}
    {/* 引入Waline的样式文件 */}
    <Script
      id="waline-css"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{
        __html: `<link rel="stylesheet" href="https://unpkg.com/@waline/client@v3/dist/waline.css" />`,
      }}
    />
    {/* 引入Waline的脚本文件 */}
    <Script type="module">
      {`
        import { init } from 'https://unpkg.com/@waline/client@v3/dist/waline.js';

        // 初始化Waline的函数，稍后会在CommentBox组件中调用
        window.initWaline = (options) => {
          init(options);
        };
      `}
    </Script>
  </>
);

export default Scripts;
