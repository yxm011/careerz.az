import { useEffect, useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';
import './TestimonialGallery.css';

const images = [
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
  'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
];

function TestimonialGallery() {
  const { t } = useTranslation();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: false,
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      id: 'user1',
      text: t('landing.testimonials.student1.text'),
      name: t('landing.testimonials.student1.name'),
      school: t('landing.testimonials.student1.school'),
      avatar: 'N',
      image: images[0],
    },
    {
      id: 'user2',
      text: t('landing.testimonials.student2.text'),
      name: t('landing.testimonials.student2.name'),
      school: t('landing.testimonials.student2.school'),
      avatar: 'E',
      image: images[1],
    },
    {
      id: 'user3',
      text: t('landing.testimonials.student3.text'),
      name: t('landing.testimonials.student3.name'),
      school: t('landing.testimonials.student3.school'),
      avatar: 'L',
      image: images[2],
    },
  ];

  const updateNav = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
    setCurrentSlide(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    updateNav();
    emblaApi.on('select', updateNav);
    emblaApi.on('reInit', updateNav);
    return () => {
      emblaApi.off('select', updateNav);
      emblaApi.off('reInit', updateNav);
    };
  }, [emblaApi, updateNav]);

  return (
    <section className="testimonial-gallery">
      <div className="testimonial-gallery-header">
        <div className="testimonial-gallery-header-text">
          <h2>{t('landing.testimonials.title')}</h2>
          <p>{t('landing.testimonials.subtitle')}</p>
        </div>
        <div className="testimonial-gallery-nav">
          <button
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canScrollPrev}
            aria-label="Previous"
          >
            <ArrowLeft size={20} />
          </button>
          <button
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canScrollNext}
            aria-label="Next"
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      <div className="testimonial-gallery-viewport" ref={emblaRef}>
        <div className="testimonial-gallery-container">
          {testimonials.map((item) => (
            <div key={item.id} className="testimonial-gallery-slide">
              <div className="testimonial-gallery-card">
                <img src={item.image} alt={item.name} />
                <div className="testimonial-gallery-card-overlay" />
                <div className="testimonial-gallery-card-content">
                  <div className="testimonial-gallery-stars">★★★★★</div>
                  <div className="testimonial-gallery-quote">{item.text}</div>
                  <div className="testimonial-gallery-author">
                    <div className="testimonial-gallery-avatar">{item.avatar}</div>
                    <div className="testimonial-gallery-author-info">
                      <strong>{item.name}</strong>
                      <span>{item.school}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="testimonial-gallery-dots">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`testimonial-gallery-dot ${currentSlide === index ? 'active' : ''}`}
            onClick={() => emblaApi?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

export default TestimonialGallery;
