import {
   Header,
   HeroSection,
   ServicesSection,
   DifferentiatorsSection,
   TimelineSection,
   TestimonialsSection,
   CTASection,
   Footer,
} from "@/components/v1";

export default function V1() {
   return (
      <div className="bg-[#F8F8F8] text-neutral-900">
         <Header />
         
         <div className="relative isolate overflow-hidden bg-[#1A1A1A] pb-24 pt-24 text-white">
            <div className="absolute inset-0 overflow-hidden">
               <div className="absolute left-1/2 top-20 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-gradient-to-br from-[#8E7FF0]/40 via-[#83FF8F]/20 to-transparent blur-3xl" />
               <div className="absolute -left-32 top-40 h-64 w-64 rotate-6 rounded-3xl bg-gradient-to-br from-[#F0DE7F]/40 via-[#FEEA9D]/30 to-transparent blur-[120px]" />
               <div className="absolute -right-40 bottom-10 h-[420px] w-[420px] -rotate-12 rounded-3xl bg-gradient-to-br from-[#83FF8F]/30 via-[#8E7FF0]/20 to-transparent blur-3xl" />
            </div>

            <main className="relative mx-auto flex max-w-6xl flex-col gap-16 px-6">
               <HeroSection />
            </main>
         </div>

         <ServicesSection />
         <DifferentiatorsSection />
         <TimelineSection />
         <TestimonialsSection />
         <CTASection />
         <Footer />
      </div>
   );
}
