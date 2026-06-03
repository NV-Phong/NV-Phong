import {
   TextEffectRoot,
   TextEffectItem,
   TextEffectLink,
} from "@/components/animation/text-effect";
import {
   MouseEffectDisableWrapper,
   MouseEffectSizeWrapper,
   MouseEffectMagnetic,
} from "@/components/animation/mouse-effect";
import { MouseMaskText } from "@/components/animation/mouse-mask-text";
import { Button } from "@/components/ui/button";

export default function Starter() {
   return (
      <div className="p-50">
         <MouseEffectDisableWrapper>
            <TextEffectRoot className="font-bold text-9xl">
               <TextEffectItem
                  overlayClassName="bg-blue-200 text-primary-foreground"
                  overlay="WOAH"
               >
                  TEXT EFFECT
               </TextEffectItem>
               <TextEffectItem
                  overlayClassName="bg-orange-200 text-primary-foreground"
                  overlay="AND CLIPPING"
               >
                  GSAP
               </TextEffectItem>
               <TextEffectItem
                  overlayClassName="bg-violet-200 text-primary-foreground"
                  overlay="CRAZYYY"
               >
                  CRAZYYY
               </TextEffectItem>
               <TextEffectItem
                  overlayClassName="bg-green-200 text-primary-foreground"
                  overlay={
                     <TextEffectLink
                        href="https://stacksorted.com/text-effects/minh-pham"
                        target="_blank"
                        rel="noopener noreferrer"
                     >
                        SOURCE
                     </TextEffectLink>
                  }
               >
                  HOVER ON ME
               </TextEffectItem>
               <TextEffectItem
                  overlayClassName="bg-pink-200 text-primary-foreground"
                  overlay={
                     <TextEffectLink
                        href="https://twitter.com/juxtopposed"
                        target="_blank"
                        rel="noopener noreferrer"
                     >
                        CONNECT
                     </TextEffectLink>
                  }
               >
                  LIKE THIS?
               </TextEffectItem>
            </TextEffectRoot>
         </MouseEffectDisableWrapper>
         <div className="pt-30">
            <MouseEffectSizeWrapper size={300} duration={0.5} mouseDuration={1}>
               <div className="font-bold text-7xl">
                  <MouseMaskText
                     mouseDuration={1}
                     maskRadius={150}
                     baseText={
                        <p className="m-0 leading-[100%] tracking-[-0.01em] text-muted-foreground/50">
                           I'm on a journey to become a software engineer who
                           builds thoughtful, scalable digital experiences.
                        </p>
                     }
                     maskText={
                        <p className="m-0 leading-[100%] tracking-[-0.01em]">
                           I’m drawn to both the elegance of user interfaces and
                           the logic behind backend systems and I find joy in
                           connecting the two.
                        </p>
                     }
                  />
               </div>
            </MouseEffectSizeWrapper>
         </div>
         <div className="pt-30 flex justify-center">
            <MouseEffectSizeWrapper
               // dotClassName="bg-pink-200"
               sizeFill
               duration={0.5}
               mouseDuration={1}
            >
               <MouseEffectMagnetic>
                  <Button
                     variant="ghost"
                     className="text-primary border hover:!bg-transparent hover:text-background hover:border-none h-30 w-30 rounded-full"
                  >
                     Button
                  </Button>
               </MouseEffectMagnetic>
            </MouseEffectSizeWrapper>
         </div>
      </div>
   );
}
