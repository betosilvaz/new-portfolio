import { motion } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"
import { useTranslation } from "react-i18next";

export default function Projects() {
  const { t } = useTranslation();

  return (
    <motion.section 
      className="w-full bg-[#f4f4f4] dark:bg-[#000000] text-[#050505] dark:text-white py-24 overflow-hidden"
      id="projects"
    >
      <div className="max-w-6xl mx-auto px-6">
        <header className="mb-16">
          <h2 className="text-sm font-medium tracking-[0.2em] uppercase opacity-50 mb-4">{t("projects.subtitle")}</h2>
          <h3 className="text-4xl md:text-5xl font-semibold tracking-tight">{t("projects.title")}</h3>
        </header>
        {/* 1. Container que limita a largura para os botões aparecerem */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 2, damping: 15, type: "spring", stiffness: 100 }}
          viewport={{ once: true, amount: 0.3 }}
          className="w-full max-w-6xl"
        >
          <Carousel opts={{ dragFree: false }} className="w-full flex flex-col justify-center">
            <CarouselContent className="-ml-4">
              <CarouselItem className="basis-full md:basis-1/2 lg:basis-1/3 pl-4">
                <div className="bg-white dark:bg-[#121212] border border-[#050505]/15 dark:border-white/10 h-full rounded-3xl min-h-[80vh]">
                </div>
              </CarouselItem>
              <CarouselItem className="basis-full md:basis-1/2 lg:basis-1/3 pl-4">
                <div className="bg-white dark:bg-[#121212] border border-[#050505]/15 dark:border-white/10 h-full rounded-3xl min-h-[80vh]">
                  
                </div>
              </CarouselItem>
              <CarouselItem className="basis-full md:basis-1/2 lg:basis-1/3 pl-4">
                <div className="bg-white dark:bg-[#121212] border border-[#050505]/15 dark:border-white/10 h-full rounded-3xl min-h-[80vh]">
                  
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </motion.div>
      </div>
    </motion.section>
  );
}