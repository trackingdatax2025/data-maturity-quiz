'use client';

import { useEffect } from 'react';

export function useIframeResize(deps: any[] = []) {
  useEffect(() => {
    const sendHeight = () => {
      if (typeof window === 'undefined') return;

      const height =
        document.documentElement.scrollHeight ||
        document.body.scrollHeight;

      window.parent?.postMessage(
        {
          type: 'TDX_IFRAME_RESIZE',
          height,
        },
        '*'
      );
    };

    // esperar al render real
    const timeout = setTimeout(sendHeight, 50);

    window.addEventListener('resize', sendHeight);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', sendHeight);
    };
  }, deps);
}
