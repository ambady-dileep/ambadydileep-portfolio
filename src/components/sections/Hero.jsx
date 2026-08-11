import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Download, MapPin } from 'lucide-react';
import { heroStats, heroCoreStack, heroRoles, siteConfig } from '../../data/site';
import { useMouseParallax } from '../../hooks/useMouseParallax';
import SpecularButton from '../ui/SpecularButton';
import { fadeUp, staggerContainer } from '../../utils/motion';
import SplitText from '../ui/SplitText';
import TextType from '../ui/TextType';
import LightRays from '../ui/LightRays';

export function Hero({ isDark }) {
  const [imgError, setImgError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { scrollY } = useScroll();
  const scrollYImage = useTransform(scrollY, [0, 500], [0, 24]);
  const mouse = useMouseParallax(5);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  const scrollToWork = () => {
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = siteConfig.resumePath;
    link.download = 'AmbadyDileepResume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const rayColor = isDark ? '#ffffff' : '#f5f5f0';

  return (
    <section
      id="hero"
      className="relative overflow-hidden"
    >
      {/* Light Rays Background Effect — desktop only. On mobile the rays either get
          cropped or have to be blown out so wide they lose their shape, and the
          PremiumBackground mesh/aurora layer beneath already carries the page. */}
      {!isMobile && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '100%',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        >
          <LightRays
            raysOrigin="top-center"
            raysColor={rayColor}
            raysSpeed={0.4}
            lightSpread={1.3}
            rayLength={2.4}
            fadeDistance={1.6}
            saturation={1.0}
            followMouse
            mouseInfluence={0.1}
            noiseAmount={0.015}
            distortion={0.01}
            pulsating={false}
          />
          <div
            style={{
              position: 'absolute',
              inset: '65% 0 0 0',
              background: isDark
                ? 'linear-gradient(to bottom, transparent 0%, rgba(3,7,18,0.4) 100%)'
                : 'linear-gradient(to bottom, transparent 0%, rgba(248,250,252,0.4) 100%)'
            }}
          />
        </div>
      )}

      {/* ── Content Container ── */}
      <div
        className="
          relative
          z-10
          w-full
          flex
          items-center
          justify-center
          min-h-auto
          lg:min-h-screen
          px-6
          md:px-10
          lg:px-12
          pt-24
          lg:pt-32
          pb-16
        "
        style={{
          zIndex: 2,
          paddingTop: isMobile ? '80px' : '110px',
          paddingBottom: isMobile ? '48px' : '72px',
          paddingLeft: isMobile ? '24px' : '5%',
          paddingRight: isMobile ? '24px' : '5%',
        }}
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="
            mx-auto
            w-full
            max-w-7xl
            flex
            flex-col
            lg:flex-row
            items-center
            justify-center
            lg:justify-between
            gap-10
            lg:gap-16
          "
        >
          {/* ── LEFT AREA: Identity + Premium Status Badge ── */}
          <motion.div
            variants={fadeUp}
            style={{
              flex: isMobile ? 'unset' : '1 1 45%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: isMobile ? 'center' : 'flex-start',
              gap: '12px',
              width: isMobile ? '100%' : 'auto',
              order: isMobile ? 1 : 0,
            }}
          >
            <h2
              className="flex items-center gap-1.5 text-[13px] sm:text-[14px] font-medium tracking-[0.03em] text-[var(--text-subtle)]"
              style={{ justifyContent: isMobile ? 'center' : 'flex-start' }}
            >
              <span>I'm a</span>
              <TextType
                as="span"
                text={heroRoles}
                typingSpeed={55}
                deletingSpeed={28}
                pauseDuration={1800}
                initialDelay={200}
                showCursor
                cursorCharacter="|"
                cursorClassName="text-blue-500"
                loop
              />
            </h2>
            
            <SplitText
              text={siteConfig.name}
              tag="h1"
              className="text-[clamp(2.2rem,4vw,3.5rem)] font-bold tracking-[-0.045em] text-[var(--text)] leading-[1.05]"
              delay={0.03}
              duration={0.6}
              ease={[0.22, 1, 0.36, 1]}
              from={{ opacity: 0, y: 20 }}
              to={{ opacity: 1, y: 0 }}
              textAlign={isMobile ? 'center' : 'left'}
              threshold={0.1}
            />

            <motion.p
              variants={fadeUp}
              className="text-[var(--text-muted)] font-light"
              style={{
                fontSize: '15px',
                lineHeight: 1.55,
                maxWidth: '420px',
                textAlign: isMobile ? 'center' : 'left',
                marginTop: '4px',
              }}
            >
              {siteConfig.headline}
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-wrap gap-2"
              style={{ justifyContent: isMobile ? 'center' : 'flex-start' }}
            >
              {heroCoreStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-[var(--border)] text-[var(--text-subtle)]"
                  style={{ fontSize: '11px', padding: '4px 10px', fontWeight: 500 }}
                >
                  {tech}
                </span>
              ))}
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="flex items-center gap-1.5 text-[12px] text-[var(--text-subtle)] font-light"
              style={{
                justifyContent: isMobile ? 'center' : 'flex-start',
                marginTop: '6px',
              }}
            >
              <MapPin className="w-3.5 h-3.5 text-blue-500" strokeWidth={2} />
              <span>Kerala, India</span>
            </motion.div>
          </motion.div>

          {/* ── CENTER AREA: Clean Portrait Card (Zero Borders) ── */}
          <motion.div
            variants={fadeUp}
            style={{
              flex: isMobile ? 'unset' : '0 0 auto',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              order: isMobile ? 0 : 1,
            }}
          >
            <motion.div style={{ y: scrollYImage }}>
              <motion.div
                style={{ x: mouse.x, y: mouse.y }}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
                className="relative"
              >
                {/* Minimal Deep Ambient Glow */}
                <div
                  style={{
                    position: 'absolute',
                    inset: '-24px',
                    borderRadius: '32px',
                    background: isDark
                      ? 'radial-gradient(ellipse at top, rgba(37,99,235,0.15) 0%, transparent 70%)'
                      : 'radial-gradient(ellipse at top, rgba(37,99,235,0.12) 0%, transparent 70%)',
                    filter: 'blur(20px)',
                    pointerEvents: 'none',
                  }}
                />
                
                {/* Gradient-edge ring: replaces the flat cutout look with a thin lit border */}
                <div
                  className="relative rounded-2xl"
                  style={{
                    width: isMobile ? '250px' : '310px',
                    padding: '1px',
                    background: isDark
                      ? 'linear-gradient(160deg, rgba(96,165,250,0.55), rgba(99,102,241,0.15) 40%, rgba(255,255,255,0.06) 100%)'
                      : 'linear-gradient(160deg, rgba(37,99,235,0.35), rgba(99,102,241,0.12) 40%, rgba(0,0,0,0.04) 100%)',
                  }}
                >
                  <div
                    className="relative w-full overflow-hidden rounded-2xl bg-[var(--bg-muted)]"
                    style={{ aspectRatio: '3/4' }}
                  >
                    {!imgError ? (
                      <img
                        src={siteConfig.heroImagePath}
                        alt={`${siteConfig.name} — Freelance Web Developer and Frontend Engineer Portrait`}
                        className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-[1.02]"
                        onError={() => setImgError(true)}
                        loading="eager"
                        fetchPriority="high"
                      />
                    ) : (
                      <div
                        className="w-full h-full flex flex-col items-center justify-center gap-2 px-4 text-center"
                        style={{ background: 'linear-gradient(to bottom, rgba(37,99,235,0.06), transparent)' }}
                      >
                        <span className="text-3xl font-semibold tracking-[-0.04em] text-blue-500/20">AD</span>
                        <p className="text-[10px] text-[var(--text-subtle)] font-light">
                          Add asset to <code className="text-[var(--text-muted)]">public/portfolio.png</code>
                        </p>
                      </div>
                    )}

                    {/* Fine grain, matching the rest of the page, so the portrait doesn't read as a separate flat asset */}
                    <div className="noise-overlay" aria-hidden="true" />

                    {/* Bottom fade into the page background so the photo's edge feels anchored, not cut out */}
                    <div
                      aria-hidden="true"
                      style={{
                        position: 'absolute',
                        inset: 'auto 0 0 0',
                        height: '35%',
                        background: `linear-gradient(to bottom, transparent, var(--bg) 130%)`,
                        opacity: isDark ? 0.55 : 0.35,
                        pointerEvents: 'none',
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* ── RIGHT AREA: Engineered Conversion Metrics + CTAs ── */}
          <motion.div
            variants={fadeUp}
            style={{
              flex: isMobile ? 'unset' : '1 1 40%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: isMobile ? 'center' : 'flex-end',
              gap: '20px',
              width: isMobile ? '100%' : 'auto',
              order: 2,
            }}
          >
            {/* Conversion Stats Deck */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '12px',
                width: isMobile ? '100%' : '310px',
              }}
            >
              {heroStats.map((stat) => (
                <div
                  key={stat.label}
                  className="glass rounded-xl flex flex-col items-center text-center border border-[var(--border)] shadow-[var(--shadow-soft)]"
                  style={{ padding: '14px 8px' }}
                >
                  <p
                    className="font-semibold text-[var(--text)] tracking-[-0.03em]"
                    style={{ fontSize: isMobile ? '15px' : '17px' }}
                  >
                    {stat.value}
                  </p>
                  <p
                    className="text-[var(--text-subtle)] mt-1 font-normal tracking-tight leading-tight"
                    style={{ fontSize: '10px' }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* High-Contrast Conversion Actions */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                width: isMobile ? '100%' : '310px',
                marginTop: isMobile ? '8px' : '0',
              }}
            >
              <SpecularButton
                size="md"
                radius={9999}
                onClick={scrollToWork}
                className="specular-button--block"
                tint="#2563eb"
                tintOpacity={1}
                baseColor="#1e3a8a"
                lineColor="#bfdbfe"
                textColor="#ffffff"
                intensity={1.1}
                shineSize={14}
                shineFade={45}
                thickness={1.4}
                speed={0.3}
                followMouse
                proximity={220}
              >
                View Featured Work
                <ArrowRight className="w-4 h-4 ml-1" strokeWidth={2} />
              </SpecularButton>

              <SpecularButton
                size="md"
                radius={9999}
                onClick={handleDownloadResume}
                className="specular-button--block"
                tint={isDark ? '#0f172a' : '#ffffff'}
                tintOpacity={isDark ? 0.55 : 0.6}
                blur={20}
                baseColor={isDark ? '#334155' : '#cbd5e1'}
                lineColor={isDark ? '#93c5fd' : '#2563eb'}
                textColor={isDark ? '#fafafa' : '#0a0a0a'}
                intensity={0.9}
                shineSize={14}
                shineFade={45}
                thickness={1.2}
                speed={0.3}
                followMouse
                proximity={220}
              >
                <Download className="w-4 h-4 mr-1" strokeWidth={1.8} />
                Download Resume
              </SpecularButton>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}