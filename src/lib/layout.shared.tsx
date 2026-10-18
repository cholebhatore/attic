import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';
import { appName, docsRoute, gitConfig, logoUrl } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      url: docsRoute,
      title: (
        <>
          <Image src={logoUrl} width={24} height={24} alt="" className="shrink-0" />
          {appName}
        </>
      ),
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
