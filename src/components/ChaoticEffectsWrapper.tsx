'use client';

import { ZaWarudo } from '@/components/ZaWarudo';
import { ChaoticMenacing, useChaoticMenacing } from '@/components/ChaoticMenacing';
import { WryyyScream } from '@/components/WryyyScream';

export function ChaoticEffectsWrapper() {
  const { isHovering, intensity } = useChaoticMenacing();

  return (
    <>
      <ZaWarudo />
      <ChaoticMenacing isActive={isHovering} intensity={intensity} />
      <WryyyScream />
    </>
  );
}