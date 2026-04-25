import { useState, useRef, useEffect } from "react";
import {
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus,
  Instagram,
  Youtube,
  ArrowUpRight,
  ArrowLeft,
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { DayPicker, DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { motion, useScroll, useTransform, MotionValue, AnimatePresence } from "motion/react";

export default function App() {
  const roomsSectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: roomsProgress } = useScroll({
    target: roomsSectionRef,
    offset: ["start start", "end end"],
  });

  const y0 = useTransform(
    roomsProgress,
    [0, 0.15, 0.4, 1],
    ["0vh", "0vh", "-30vh", "-30vh"],
  );
  const opacity0 = useTransform(
    roomsProgress,
    [0, 0.15, 0.35, 1],
    [1, 1, 0, 0],
  );

  const y1 = useTransform(
    roomsProgress,
    [0, 0.15, 0.4, 0.6, 0.85, 1],
    ["100vh", "100vh", "0vh", "0vh", "-30vh", "-30vh"],
  );
  const opacity1 = useTransform(roomsProgress, [0, 0.6, 0.8, 1], [1, 1, 0, 0]);

  const y2 = useTransform(
    roomsProgress,
    [0, 0.6, 0.85, 1],
    ["100vh", "100vh", "0vh", "0vh"],
  );
  const opacity2 = useTransform(roomsProgress, [0, 1], [1, 1]);

  const [activeDropdown, setActiveDropdown] = useState<
    "date" | "type" | "guests" | null
  >(null);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(new Date().setDate(new Date().getDate() + 4)),
  });
  const [selectedType, setSelectedType] = useState("Appartement");
  const [rooms, setRooms] = useState(2);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const typeOptions = [
    "Appartement",
    "Suite Deluxe",
    "Chambre Supérieure",
    "Chalet Privé",
  ];

  const toggleDropdown = (dropdown: "date" | "type" | "guests") => {
    setActiveDropdown((current) => (current === dropdown ? null : dropdown));
  };

  const formattedDate = dateRange?.from
    ? dateRange.to
      ? `${format(dateRange.from, "dd.MM.yyyy")} - ${format(dateRange.to, "dd.MM.yyyy")}`
      : format(dateRange.from, "dd.MM.yyyy")
    : "Sélectionner dates";

  const guestsSummary = `${rooms} Chambre${rooms > 1 ? "s" : ""}, ${adults + children} Personne${adults + children > 1 ? "s" : ""}`;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <div className="relative min-h-screen font-sans selection:bg-white/30">
      {/* Fixed Background Layer */}
      <div
        className="fixed inset-0 bg-cover bg-center z-[-2]"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=2600&auto=format&fit=crop')`, // Luxury hotel
        }}
      />

      {/* Initial Cinematic White Overlay */}
      <motion.div
        initial={{ y: "0%" }}
        animate={{ y: "-100%" }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="fixed inset-0 bg-white z-[9999] pointer-events-none"
      />

      {/* Tonal overlay to match the frosted blue/misty feel of the mockup */}
      <div className="fixed inset-0 bg-[#aed0df] mix-blend-color opacity-30 pointer-events-none z-[-1]" />
      <div className="fixed inset-0 bg-gradient-to-b from-black/60 via-black/10 to-transparent pointer-events-none z-[-1]" />
      <div className="fixed inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none z-[-1]" />

      {/* Full Screen Layout */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.1, delayChildren: 0.9 } },
        }}
        className="relative w-full"
      >
        <div className="relative w-full min-h-[100dvh]">
          {/* Header */}
          <header className="relative w-full px-8 md:px-16 pt-10 pb-6 flex flex-col md:flex-row justify-between items-center z-50 gap-6">
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-10 md:gap-16 w-full md:w-auto justify-between md:justify-start text-[10px] sm:text-[11px] font-medium tracking-[0.15em] text-white/70 uppercase"
            >
              <MenuDrawer />
              <div className="flex items-center gap-2">
                <span>EN</span>
                <span className="text-white/40">/</span>
                <span className="text-white">FR</span>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="absolute left-1/2 -translate-x-1/2 top-10 md:top-auto"
            >
              <h2 className="font-serif italic text-xl md:text-[26px] font-semibold text-white tracking-wide">
                Hôtel Mia
              </h2>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-center justify-between md:justify-end gap-10 md:gap-16 w-full md:w-auto text-[10px] sm:text-[11px] font-medium tracking-[0.15em] text-white/70 uppercase hidden sm:flex"
            >
              <a href="#" className="hover:text-white transition-colors">
                CONTACTS
              </a>
              <a
                href="#"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                RÉSERVATION{" "}
                <ArrowRight size={14} strokeWidth={1.5} className="ml-1" />
              </a>
            </motion.div>
          </header>

          {/* Hero Content */}
          <main className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center pointer-events-none">
            <motion.h1
              initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }}
              animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
              transition={{ duration: 0.7, delay: 0.9, ease: "easeOut" }}
              className="font-serif italic text-[3.5rem] md:text-[6.5rem] lg:text-[7.5rem] text-white font-semibold leading-[1.05] tracking-tight drop-shadow-[0_10px_30px_rgba(0,0,0,0.1)]"
            >
              Hôtel Mia
            </motion.h1>
          </main>

          {/* Bottom Booking Widget */}
          <motion.div
            variants={itemVariants}
            className={`fixed z-[100] flex justify-center pointer-events-auto transition-all duration-500 ${
              isScrolled
                ? "bottom-0 left-0 right-0 w-full"
                : "bottom-4 md:bottom-10 left-4 right-4 md:left-12 md:right-12"
            }`}
          >
            {/* Fullscreen click-away overlay */}
            {activeDropdown && (
              <div
                className="fixed inset-0 z-[-1]"
                onClick={() => setActiveDropdown(null)}
              />
            )}

            <div
              className={`w-full max-w-5xl relative z-40 transition-all duration-500`}
            >
              {/* Date Selector Modal */}
              {activeDropdown === "date" && (
                <div className="absolute bottom-full mb-6 left-0 md:left-0 w-[320px] backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-4 text-white shadow-[0_15px_40px_rgba(0,0,0,0.2)] animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <style>
                    {`
                      .rdp-root { 
                        --rdp-accent-color: black; 
                        --rdp-background-color: rgba(0, 0, 0, 0.2);
                        --rdp-selected-color: white;
                        --rdp-cell-size: 34px; 
                        margin: 0; 
                      }
                      .rdp-day_selected:not(.rdp-day_range_middle), .rdp-selected:not(.rdp-range_middle), .rdp-range_start, .rdp-range_end { 
                        background-color: black !important; 
                        color: white !important; 
                        border-radius: 50% !important;
                        border: none !important;
                      }
                      .rdp-day_range_middle, .rdp-range_middle { 
                        background-color: rgba(0, 0, 0, 0.4) !important; 
                        color: white !important; 
                        border-radius: 0 !important; 
                      }
                      button.rdp-day:hover:not(.rdp-day_selected):not(.rdp-selected) { 
                        background-color: rgba(255,255,255,0.1) !important; 
                      }
                      .rdp-day_today, .rdp-today { 
                        color: white !important; 
                        font-weight: bold !important; 
                      }
                    `}
                  </style>
                  <DayPicker
                    mode="range"
                    selected={dateRange}
                    onSelect={setDateRange}
                    locale={fr}
                    showOutsideDays
                    className="text-sm font-sans"
                  />
                </div>
              )}

              {/* Type Selector Modal */}
              {activeDropdown === "type" && (
                <div className="absolute bottom-full mb-6 left-0 md:left-[35%] w-[280px] backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-3 text-white shadow-[0_15px_40px_rgba(0,0,0,0.2)] animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <div className="flex flex-col gap-1">
                    {typeOptions.map((type) => (
                      <button
                        key={type}
                        onClick={() => {
                          setSelectedType(type);
                          setActiveDropdown(null);
                        }}
                        className={`text-left px-4 py-3 rounded-lg text-[13px] tracking-wide transition-colors ${selectedType === type ? "bg-white/20 font-medium" : "hover:bg-white/10 text-white/80"}`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Guest Selector Modal */}
              {activeDropdown === "guests" && (
                <div className="absolute bottom-full mb-6 right-0 md:right-[20%] w-[280px] backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-6 text-white shadow-[0_15px_40px_rgba(0,0,0,0.2)] animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <div className="space-y-5">
                    <GuestRow
                      label="Chambres"
                      value={rooms}
                      onChange={setRooms}
                    />
                    <GuestRow
                      label="Adultes"
                      value={adults}
                      onChange={setAdults}
                    />
                    <GuestRow
                      label="Enfant"
                      value={children}
                      onChange={setChildren}
                    />
                  </div>
                  <div className="mt-6 pt-5 border-t border-white/10">
                    <button
                      className="w-full flex items-center justify-between text-[11px] font-medium tracking-[0.15em] uppercase hover:text-white/80 transition-colors"
                      onClick={() => setActiveDropdown(null)}
                    >
                      CONFIRMER <ArrowRight size={14} strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              )}

              {/* Main Booking Bar */}
              <div
                className={`hidden md:grid grid-cols-[1.5fr_1fr_1fr_auto] gap-8 items-center px-10 pt-4 pb-4 border-white/20 shadow-2xl relative overflow-hidden transition-all duration-500 ${
                  isScrolled
                    ? "bg-zinc-950/50 backdrop-blur-3xl border-t border-l border-r rounded-t-2xl max-w-[1200px] mx-auto w-full"
                    : "bg-white/5 backdrop-blur-xl pt-8 pb-10 border rounded-2xl"
                }`}
              >
                {/* Optional subtle gradient overlay inside the bar */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

                {/* Column 1: Date */}
                <div className="flex flex-col gap-3 relative z-10">
                  <label className="text-[10px] tracking-[0.15em] font-medium text-white/50 uppercase ml-1">
                    DATE
                  </label>
                  <div
                    className={`flex items-center justify-between border-b pb-2.5 cursor-pointer transition-colors group ${
                      activeDropdown === "date"
                        ? "border-white"
                        : "border-white/30 hover:border-white"
                    }`}
                    onClick={() => toggleDropdown("date")}
                  >
                    <span className="text-sm text-white font-medium tracking-wide">
                      {formattedDate}
                    </span>
                    {activeDropdown === "date" ? (
                      <ChevronUp
                        size={16}
                        strokeWidth={1.5}
                        className="text-white"
                      />
                    ) : (
                      <ChevronDown
                        size={16}
                        strokeWidth={1.5}
                        className="text-white/60 group-hover:text-white transition-colors"
                      />
                    )}
                  </div>
                </div>

                {/* Column 2: Type */}
                <div className="flex flex-col gap-3 relative z-10">
                  <label className="text-[10px] tracking-[0.15em] font-medium text-white/50 uppercase ml-1">
                    TYPE
                  </label>
                  <div
                    className={`flex items-center justify-between border-b pb-2.5 cursor-pointer transition-colors group ${
                      activeDropdown === "type"
                        ? "border-white"
                        : "border-white/30 hover:border-white"
                    }`}
                    onClick={() => toggleDropdown("type")}
                  >
                    <span className="text-sm text-white font-medium tracking-wide">
                      {selectedType}
                    </span>
                    {activeDropdown === "type" ? (
                      <ChevronUp
                        size={16}
                        strokeWidth={1.5}
                        className="text-white"
                      />
                    ) : (
                      <ChevronDown
                        size={16}
                        strokeWidth={1.5}
                        className="text-white/60 group-hover:text-white transition-colors"
                      />
                    )}
                  </div>
                </div>

                {/* Column 3: Guests */}
                <div className="flex flex-col gap-3 relative z-10">
                  <label className="text-[10px] tracking-[0.15em] font-medium text-white/50 uppercase ml-1">
                    INVITÉS
                  </label>
                  <div
                    className={`flex items-center justify-between border-b pb-2.5 cursor-pointer transition-colors group ${
                      activeDropdown === "guests"
                        ? "border-white"
                        : "border-white/30 hover:border-white"
                    }`}
                    onClick={() => toggleDropdown("guests")}
                  >
                    <span className="text-sm text-white font-medium tracking-wide">
                      {guestsSummary}
                    </span>
                    {activeDropdown === "guests" ? (
                      <ChevronUp
                        size={16}
                        strokeWidth={1.5}
                        className="text-white"
                      />
                    ) : (
                      <ChevronDown
                        size={16}
                        strokeWidth={1.5}
                        className="text-white/60 group-hover:text-white transition-colors"
                      />
                    )}
                  </div>
                </div>

                {/* Column 4: Submit */}
                <div className="flex items-center pb-[10px] pl-4 relative z-10">
                  <button className="flex items-center gap-3 text-[11px] font-medium tracking-[0.15em] uppercase text-white hover:text-white/80 transition-colors cursor-pointer disabled:cursor-not-allowed">
                    RÉSERVER <ArrowRight size={14} strokeWidth={1.5} />
                  </button>
                </div>
              </div>

              {/* Mobile Booking Bar (Simplified) */}
              <div
                className={`md:hidden flex flex-col gap-2 shadow-xl relative z-20 border-white/20 transition-all duration-500 ${
                  isScrolled
                    ? "bg-zinc-950/65 backdrop-blur-3xl p-3 border-t border-l border-r rounded-t-2xl w-full"
                    : "bg-white/5 backdrop-blur-xl p-6 border rounded-2xl"
                }`}
              >
                <div
                  className="flex items-center justify-between border-b border-white/30 pb-3 cursor-pointer"
                  onClick={() => toggleDropdown("date")}
                >
                  <span className="text-xs text-white/80">{formattedDate}</span>
                  {activeDropdown === "date" ? (
                    <ChevronUp size={14} className="text-white" />
                  ) : (
                    <ChevronDown size={14} className="text-white/60" />
                  )}
                </div>
                <div
                  className="flex items-center justify-between border-b border-white/30 pb-3 cursor-pointer"
                  onClick={() => toggleDropdown("type")}
                >
                  <span className="text-xs text-white/80">{selectedType}</span>
                  {activeDropdown === "type" ? (
                    <ChevronUp size={14} className="text-white" />
                  ) : (
                    <ChevronDown size={14} className="text-white/60" />
                  )}
                </div>
                <div
                  className="flex items-center justify-between border-b border-white/30 pb-3 cursor-pointer"
                  onClick={() => toggleDropdown("guests")}
                >
                  <span className="text-xs text-white/80">{guestsSummary}</span>
                  {activeDropdown === "guests" ? (
                    <ChevronUp size={14} className="text-white" />
                  ) : (
                    <ChevronDown size={14} className="text-white/60" />
                  )}
                </div>
                <button className="flex items-center justify-center gap-2 mt-2 w-full p-3 bg-white/10 hover:bg-white/20 transition-colors rounded-lg text-xs font-medium tracking-widest text-white uppercase cursor-pointer">
                  RÉSERVER <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ROOMS STICKY SECTION */}
        <div
          ref={roomsSectionRef}
          className="relative h-[300vh] w-full z-30 bg-[#fdfdfd]"
        >
          <div className="sticky top-0 h-[100vh] w-full">
            <div className="relative w-full h-full overflow-hidden bg-[#fdfdfd]">
              {/* Background wireframes */}
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.05] z-[5] hidden md:block">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.05"
                >
                  <path d="M-10,-10 Q50,120 110,-10" />
                  <path d="M-10,110 Q50,-20 110,110" />
                </svg>
              </div>

              <RoomSlideComponent
                data={roomData[0]}
                yTransform={y0}
                opacity={opacity0}
                zIndex={10}
              />
              <RoomSlideComponent
                data={roomData[1]}
                yTransform={y1}
                opacity={opacity1}
                zIndex={20}
              />
              <RoomSlideComponent
                data={roomData[2]}
                yTransform={y2}
                opacity={opacity2}
                zIndex={30}
              />
            </div>
          </div>
        </div>

        <ServicesSection />
        <StayServicesSection />
        <TestimonialSection />
        <GallerySection />
        <Footer />
      </motion.div>
    </div>
  );
}

const StayServicesSection = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number>(0);

    const services = [
        { title: "Détente. Fraîcheur. Renouveau.", description: "Offrez-vous une échappée paisible avec nos soins spa apaisants et notre expertise.", image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=1200&auto=format&fit=crop" },
        { title: "Fraîcheur", description: "Ressourcez-vous avec nos installations de classe mondiale.", image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=800&auto=format&fit=crop" },
        { title: "Détente", description: "Un moment de calme absolu dans nos espaces de relaxation.", image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=800&auto=format&fit=crop" }
    ];

    return (
        <section className="bg-[#fcfcfc] py-24 md:py-32 px-6 md:px-12">
            {/* Header */}
            <div className="max-w-3xl mx-auto text-center mb-16 md:mb-24">
                <h2 className="font-serif text-4xl md:text-5xl text-zinc-900 mb-6 italic tracking-tight">Votre Séjour, Notre Service</h2>
                <p className="font-sans text-zinc-600 text-lg leading-relaxed">
                    Nous fournissons tout ce dont vous avez besoin pour un séjour fluide et sans stress. De la réservation facile aux services personnalisés, votre confort est notre priorité absolue.
                </p>
            </div>

            {/* Flex Container */}
            <div className="max-w-[85rem] mx-auto flex flex-col md:flex-row h-[700px] gap-4">
                {services.map((service, index) => (
                    <motion.div
                        key={index}
                        initial={false}
                        animate={{ flex: hoveredIndex === index ? 3 : 1 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        onHoverStart={() => setHoveredIndex(index)}
                        className="relative overflow-hidden rounded-md border border-amber-600/30 cursor-pointer"
                    >
                        <motion.img
                            src={service.image}
                            alt={service.title}
                            className="w-full h-full object-cover"
                            animate={{ scale: hoveredIndex === index ? 1.05 : 1 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        />
                        <div className="absolute inset-0 bg-black/40"></div>
                        
                        {/* Expanded Content */}
                        <motion.div 
                            className="absolute inset-0 p-8 flex flex-col justify-end gap-2"
                            animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h3 className="font-serif text-3xl text-white italic">{service.title}</h3>
                            <p className="text-white/80 font-sans text-sm max-w-sm">{service.description}</p>
                            <div className="w-20 h-px bg-white/50 mt-2"></div>
                        </motion.div>

                        {/* Collapsed Content */}
                        <motion.div
                            className="absolute inset-0 p-8 flex items-center justify-center"
                            animate={{ opacity: hoveredIndex === index ? 0 : 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h3 className="font-serif text-3xl text-white italic truncate">{service.title.split('.')[0]}</h3>
                        </motion.div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

const testimonials = [
  { name: "Kanku Tshilumba", location: "Bunia", quote: "Un séjour inoubliable, la qualité du service est tout simplement exceptionnelle.", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop" },
  { name: "Kabeya Mbuyi", location: "Kinshasa", quote: "La vue est spectaculaire, le calme absolu, un véritable havre de paix.", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop" },
  { name: "Ngalula Makengo", location: "Lubumbashi", quote: "Une architecture moderne alliée à une hospitalité chaleureuse. Je recommande vivement.", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop" },
  { name: "Mutombo Dikembe", location: "Kisangani", quote: "Chaque détail a été pensé pour notre confort. Une expérience vraiment haut de gamme.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" },
  { name: "Kapinga Mulumba", location: "Bunia", quote: "Parfait pour le repos. L'équipe est dévouée et très professionnelle.", image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=200&auto=format&fit=crop" }
];

const TestimonialSection = () => {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="relative w-full py-24 md:py-32 px-6 md:px-12 flex flex-col items-center bg-[url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center text-white">
      {/* Background overlay for mood */}
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-20">
        <div className="w-full md:w-1/2">
          <h2 className="font-sans text-[2.5rem] md:text-[3.5rem] leading-[1.1] tracking-tight mb-8">
            Des expériences qui en disent plus long que mille mots
          </h2>
          <p className="font-sans text-lg text-white/70 max-w-md">
            Chaque histoire est un reflet de ce que nous défendons : une beauté intemporelle, une indulgence sans effort et une véritable connexion.
          </p>
        </div>

        <div className="w-full md:w-1/2 relative">
          <TestimonialCard testimonial={testimonials[index]} />
          {/* Mock Carousel Navigation */}
          <div className="hidden md:flex absolute -left-20 top-1/2 -translate-y-1/2 flex-col gap-6">
            <button onClick={prev} className="p-4 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors">
                <ChevronLeft size={24} />
            </button>
            <button onClick={next} className="p-4 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors">
                <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => {
  return (
    <div className="relative w-full bg-white/10 backdrop-blur-md border border-white/20 p-8 md:p-12 rounded-[2rem] shadow-2xl">
      <p className="text-xl md:text-2xl leading-relaxed text-white/90 mb-12">
        "{testimonial.quote}"
      </p>
      <div className="flex items-center gap-4">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-14 h-14 rounded-full object-cover"
        />
        <div>
          <div className="font-semibold text-lg">{testimonial.name}</div>
          <div className="text-white/60">{testimonial.location}</div>
        </div>
      </div>
    </div>
  );
};

interface GuestRowProps {
  label: string;
  value: number;
  onChange: (val: number) => void;
}

function GuestRow({ label, value, onChange }: GuestRowProps) {
  return (
    <div className="flex items-center justify-between">
      <button
        onClick={() => onChange(Math.max(0, value - 1))}
        className="w-6 h-6 flex items-center justify-center text-white/60 hover:text-black hover:bg-white rounded-full transition-all duration-200"
      >
        <Minus size={14} strokeWidth={1.5} />
      </button>
      <span className="w-24 text-center text-[13px] font-medium tracking-wide text-white/90">
        {value} {label}
      </span>
      <button
        onClick={() => onChange(value + 1)}
        className="w-6 h-6 flex items-center justify-center text-white/60 hover:text-black hover:bg-white rounded-full transition-all duration-200"
      >
        <Plus size={14} strokeWidth={1.5} />
      </button>
    </div>
  );
}

const roomData = [
  {
    id: "junior",
    label: "Junior",
    title: "Suite",
    imgLeft:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1200&auto=format&fit=crop",
    imgCenter:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2000&auto=format&fit=crop",
    desc: "Notre Junior Suite offre un espace généreux avec un coin salon intégré. Idéale pour les séjours prolongés où le confort absolu est de mise.",
    includes: [
      "Wi-Fi Haut Débit Gratuit",
      "Accès Spa & Fitness",
      "Machine Nespresso",
    ],
    price: "$250",
    reverse: false,
  },
  {
    id: "business",
    label: "Business",
    title: "Suite",
    imgLeft:
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=1200&auto=format&fit=crop",
    imgCenter:
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2000&auto=format&fit=crop",
    desc: "Conçue pour les professionnels exigeants. Un espace de travail dédié avec vue panoramique et un service impeccable pour allier affaires et détente.",
    includes: [
      "Bureau Ergonomique",
      "Wi-Fi Premium Dédié",
      "Accès Lounge Exécutif",
    ],
    price: "$300",
    reverse: true,
  },
  {
    id: "standard",
    label: "Chambre",
    title: "Standard",
    imgLeft:
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1200&auto=format&fit=crop",
    imgCenter:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2000&auto=format&fit=crop",
    desc: "L'essence de l'hospitalité. Une chambre lumineuse et apaisante, parfaite pour se ressourcer après une journée d'exploration en montagne.",
    includes: [
      "Petit-Déjeuner Buffet",
      "Produits d'Accueil Bios",
      "Smart TV 4K",
    ],
    price: "$50",
    reverse: false,
  },
];

const RoomSlideComponent = ({
  data,
  yTransform,
  opacity,
  zIndex,
}: {
  data: any;
  yTransform: MotionValue<string>;
  opacity: MotionValue<number>;
  zIndex: number;
}) => {
  return (
    <motion.div
      style={{ y: yTransform, opacity, zIndex }}
      className="absolute inset-0 w-full h-[100vh] bg-[#fdfdfd] flex flex-col items-center justify-center overflow-hidden shadow-[0_-15px_40px_rgba(0,0,0,0.08)] py-6 md:py-10"
    >
      {/* Title placed at the top of the room content */}
      <div className="w-full flex justify-center items-center flex-col z-30 mb-6 md:mb-8">
        <span className="font-sans font-medium text-[3vw] md:text-[0.9vw] uppercase tracking-[0.4em] text-zinc-500 mb-2 text-center leading-none">
          {data.label}
        </span>
        <span className="font-serif text-[10vw] md:text-[5.5vw] uppercase leading-[0.85] tracking-tight text-zinc-900 text-center">
          {data.title}
        </span>
      </div>

      <div
        className={`max-w-[90rem] mx-auto w-full px-6 flex flex-col ${data.reverse ? "md:flex-row-reverse" : "md:flex-row"} justify-between items-center md:items-start relative z-20 gap-6 md:gap-0 mt-4 md:mt-6`}
      >
        {/* Secondary Detail Image (Left or Right) */}
        <div
          className={`w-[50%] md:w-[20%] aspect-[3/4] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] ${data.reverse ? "md:translate-y-2 lg:translate-y-4" : "-translate-y-2 md:-translate-y-4 lg:-translate-y-6"}`}
        >
          <img
            src={data.imgLeft}
            className="w-full h-full object-cover"
            alt={`${data.label} ${data.title} Detail`}
          />
        </div>

        {/* Center Main Image */}
        <div
          className={`w-[80%] md:w-[32%] flex flex-col relative ${data.reverse ? "-translate-y-4 md:-translate-y-6 lg:-translate-y-10" : "translate-y-2 md:translate-y-4 lg:translate-y-6"}`}
        >
          <div className="w-full aspect-[4/5] lg:aspect-square object-cover overflow-hidden bg-zinc-900 shadow-[0_30px_70px_rgba(0,0,0,0.25)]">
            <img
              src={data.imgCenter}
              className="w-full h-full object-cover brightness-[0.85]"
              alt={`${data.label} ${data.title} Main`}
            />
          </div>
        </div>

        {/* Content Details */}
        <div
          className={`w-[85%] md:w-[22%] flex flex-col pt-4 md:pt-10 lg:pt-16 ${data.reverse ? "md:items-end md:text-right" : ""}`}
        >
          <p
            className={`text-[12px] md:text-[12px] lg:text-[13px] leading-[1.7] text-zinc-600 font-sans mb-6 md:mb-8 ${data.reverse ? "md:text-right" : ""}`}
          >
            {data.desc}
          </p>

          <div
            className={`flex flex-col gap-1.5 mb-8 md:mb-10 w-full ${data.reverse ? "items-end" : ""}`}
          >
            <h4 className="text-[9px] uppercase tracking-[0.15em] text-zinc-400 font-bold mb-2.5">
              Inclus
            </h4>
            {data.includes.map((inc: string, idx: number) => (
              <span
                key={idx}
                className={`w-full text-[10px] lg:text-[11px] text-zinc-800 uppercase tracking-wider border-b border-zinc-200 pb-2 ${data.reverse ? "text-right" : "text-left"}`}
              >
                {inc}
              </span>
            ))}
          </div>

          <div
            className={`flex items-end gap-2.5 ${data.reverse ? "md:justify-end" : ""}`}
          >
            <span className="font-serif italic text-3xl lg:text-4xl text-zinc-900">
              {data.price}
            </span>
            <span className="text-[9px] lg:text-[10px] text-zinc-500 uppercase tracking-widest pb-1">
              / Nuit
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const TiktokIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.9 3.09 2.38 3.56v2.99c-1.22-.05-2.42-.36-3.48-.96v8.4c0 3.3-2.6 6.01-5.91 6.01-3.32 0-6.03-2.7-6.03-6.01s2.71-6.01 6.03-6.01c.21 0 .42.02.62.04v3.08c-.21-.02-.42-.03-.62-.03-1.63 0-2.95 1.34-2.95 2.98 0 1.65 1.32 2.99 2.95 2.99 1.63 0 2.94-1.34 2.94-2.99V.02h3.16z" />
  </svg>
);

const servicesData = [
  {
    title: "Spa & Bien-être",
    tag: "Accès illimité",
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Piscine Infinie",
    tag: "Ouvert 24h/24",
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Restaurant Étoilé",
    tag: "Petit-déjeuner inclus",
    image:
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Salle de Sport",
    tag: "Équipement premium",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop",
  },
];

const ServicesSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth * 0.3;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full bg-[#fdfdfd] pt-24 pb-16 pl-6 md:pl-12 flex flex-col relative z-40 overflow-hidden">
      <div className="w-full mb-10 pr-6 md:pr-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-8">
        <h2 className="font-sans font-medium text-[2rem] md:text-[3rem] text-zinc-900 tracking-tight leading-tight max-w-xl shrink-0">
          Nos services & équipements
        </h2>

        <div className="flex flex-col md:flex-row items-start md:items-end gap-6 md:gap-8">
          <p className="font-sans text-[14px] md:text-[15px] text-zinc-600 max-w-[24rem] leading-[1.6]">
            Réservez votre séjour pour profiter de services sur-mesure,
            d'équipements luxueux et d'une détente absolue. Prenez le temps de
            créer des souvenirs inoubliables.
          </p>

          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={() => scroll("left")}
              className="w-12 h-12 md:w-[3.5rem] md:h-[3.5rem] rounded-full border border-zinc-900 flex items-center justify-center text-zinc-900 hover:bg-zinc-100 transition-colors"
            >
              <ArrowLeft size={22} strokeWidth={1} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-12 h-12 md:w-[3.5rem] md:h-[3.5rem] rounded-full bg-zinc-900 flex items-center justify-center text-white hover:bg-zinc-800 transition-colors shadow-md"
            >
              <ArrowRight size={22} strokeWidth={1} />
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable Container for cards */}
      <div
        ref={scrollRef}
        className="flex w-full overflow-hidden pr-6 md:pr-12 pb-8 gap-4 md:gap-6"
      >
        {servicesData.map((service, idx) => (
          <div
            key={idx}
            className="relative flex-none w-[85vw] sm:w-[50vw] md:w-[26vw] aspect-[4/5] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden group shadow-sm"
          >
            <img
              src={service.image}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              alt={service.title}
            />
            <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-black/0" />

            {/* Top Right Tag */}
            <div className="absolute top-6 md:top-8 right-6 md:right-8 border border-white/50 bg-black/20 backdrop-blur-md rounded-full px-4 py-1.5 flex items-center justify-center">
              <span className="text-white font-sans text-xs md:text-sm font-light tracking-wide">
                {service.tag}
              </span>
            </div>

            {/* Bottom Glass Panel */}
            <div className="absolute bottom-4 left-4 right-4 md:bottom-5 md:left-5 md:right-5 bg-white/20 backdrop-blur-xl border border-white/30 rounded-[1.5rem] md:rounded-[2rem] p-5 md:p-6 flex justify-between items-center shadow-lg transition-transform duration-500 group-hover:-translate-y-1">
              <h3 className="text-white font-sans text-[22px] md:text-[28px] font-medium tracking-tight leading-none">
                {service.title}
              </h3>

              <button className="w-12 h-12 md:w-[3.5rem] md:h-[3.5rem] bg-black rounded-full flex items-center justify-center transform transition-transform duration-300 group-hover:scale-105 shrink-0 shadow-md">
                <ArrowUpRight
                  className="text-white"
                  size={24}
                  strokeWidth={1.5}
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const galleryImages = [
  { url: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=1200&auto=format&fit=crop", alt: "Hotel Interior" },
  { url: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1200&auto=format&fit=crop", alt: "Restaurant" },
  { url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1200&auto=format&fit=crop", alt: "Pool" },
  { url: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1200&auto=format&fit=crop", alt: "Spa Detail" }
];

const MenuDrawer = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsOpen(false);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    const menuItems = [
        { label: "Accueil", href: "#" },
        { label: "Chambres", href: "#" },
        { label: "Services", href: "#" },
        { label: "Galerie", href: "#" },
        { label: "Contact", href: "#" }
    ];

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-3 md:gap-4 hover:text-white transition-colors group cursor-pointer"
                aria-label="Ouvrir le menu"
            >
                <div className="flex flex-col gap-[3px] opacity-80 group-hover:opacity-100 transition-opacity">
                    <div className="w-4 h-[1.5px] bg-current" />
                    <div className="w-4 h-[1.5px] bg-current" />
                </div>
                MENU
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/20 z-[9998]"
                        />
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ duration: 0.35, ease: "easeOut" }}
                            className="fixed top-0 left-0 w-[300px] h-screen bg-white/20 backdrop-blur-md border-r border-white/10 z-[99999] flex flex-col items-start py-10"
                            role="dialog"
                            aria-modal="true"
                        >
                            <button
                                onClick={() => setIsOpen(false)}
                                className="mb-10 ml-12 text-white hover:text-zinc-300 transition-colors"
                                aria-label="Fermer le menu"
                            >
                                <X size={32} />
                            </button>
                            <nav className="flex flex-col items-start gap-8 w-full px-12">
                                {menuItems.map((item, idx) => (
                                    <a
                                        key={idx}
                                        href={item.href}
                                        className="text-base font-normal normal-case text-white hover:text-zinc-300 transition-colors"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item.label}
                                    </a>
                                ))}
                            </nav>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};


const GallerySection = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  useEffect(() => {
    if (selectedImageIndex !== null) {
      document.body.style.overflow = "hidden";
      
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setSelectedImageIndex(null);
        } else if (e.key === "ArrowRight") {
          setSelectedImageIndex((prev) => (prev! + 1) % galleryImages.length);
        } else if (e.key === "ArrowLeft") {
          setSelectedImageIndex((prev) => (prev! - 1 + galleryImages.length) % galleryImages.length);
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "unset";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "unset";
    }
  }, [selectedImageIndex]);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prev) => (prev! + 1) % galleryImages.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prev) => (prev! - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  const closeModal = () => setSelectedImageIndex(null);

  return (
    <section className="w-full bg-[#fdfdfd] pt-16 md:pt-24 pb-16 md:pb-24 px-6 md:px-12 flex flex-col relative z-40 min-h-screen justify-center">
      <div className="w-full mb-10 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-end shrink-0">
        <h2 className="font-sans font-medium text-[2.5rem] md:text-[3.25rem] text-zinc-900 tracking-tight leading-[1.05]">
          Notre Galerie
        </h2>

        <div className="flex md:justify-center">
          <p className="font-sans text-[14px] md:text-[15px] text-zinc-600 max-w-[20rem] leading-[1.6]">
            Nous proposons une gamme d'installations exceptionnelles pour faire de votre séjour une expérience confortable et mémorable.
          </p>
        </div>

        <div className="flex md:justify-end">
          <button 
            onClick={() => setSelectedImageIndex(0)}
            className="flex items-center gap-3 border border-zinc-900 rounded-full pl-6 pr-1.5 py-1.5 hover:bg-zinc-50 transition-colors group cursor-pointer w-fit shrink-0"
          >
            <span className="text-[14px] font-medium text-zinc-900 pr-1 whitespace-nowrap">Voir tout</span>
            <div className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center transition-transform group-hover:scale-105 shrink-0">
               <ArrowUpRight size={16} strokeWidth={1.5} className="text-white" />
            </div>
          </button>
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full h-[800px] md:h-[60vh] lg:h-[70vh]">
        {/* Left Column (Tall) */}
        <div 
          onClick={() => setSelectedImageIndex(0)}
          className="relative w-full h-[300px] md:h-full rounded-[1.5rem] overflow-hidden group cursor-pointer"
        >
          <img src={galleryImages[0].url} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]" alt={galleryImages[0].alt} />
        </div>

        {/* Middle Column (Two stacked) */}
        <div className="flex flex-col gap-4 h-[600px] md:h-full">
          <div 
            onClick={() => setSelectedImageIndex(1)}
            className="relative w-full flex-1 rounded-[1.5rem] overflow-hidden group min-h-0 cursor-pointer"
          >
            <img src={galleryImages[1].url} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]" alt={galleryImages[1].alt} />
          </div>
          <div 
            onClick={() => setSelectedImageIndex(2)}
            className="relative w-full flex-1 rounded-[1.5rem] overflow-hidden group min-h-0 cursor-pointer"
          >
            <img src={galleryImages[2].url} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]" alt={galleryImages[2].alt} />
          </div>
        </div>

        {/* Right Column (Tall) */}
        <div 
          onClick={() => setSelectedImageIndex(3)}
          className="relative w-full h-[300px] md:h-full rounded-[1.5rem] overflow-hidden group cursor-pointer"
        >
          <img src={galleryImages[3].url} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]" alt={galleryImages[3].alt} />
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm"
            onClick={closeModal}
          >
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-50 p-2"
            >
              <X size={32} strokeWidth={1.5} />
            </button>

            <button
              onClick={handlePrev}
              className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-4 z-50"
            >
              <ChevronLeft size={48} strokeWidth={1} />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-4 z-50"
            >
              <ChevronRight size={48} strokeWidth={1} />
            </button>

            <motion.div
              key={selectedImageIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full max-w-6xl max-h-[85vh] px-12 flex justify-center items-center pointer-events-none"
            >
              <img
                src={galleryImages[selectedImageIndex].url}
                alt={galleryImages[selectedImageIndex].alt}
                className="max-w-full max-h-[85vh] object-contain pointer-events-auto rounded-md shadow-2xl"
                onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking image
              />
            </motion.div>
            
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 font-sans text-sm tracking-widest">
              {selectedImageIndex + 1} / {galleryImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="w-full bg-[#fdfdfd] pt-24 md:pt-40 pb-32 md:pb-40 px-6 md:px-12 flex flex-col relative z-50 border-t border-zinc-200">
      {/* Links */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12 mb-8 relative z-20">
        <a
          href="#"
          className="flex items-center gap-2 font-sans text-xs md:text-[13px] font-semibold text-zinc-900 hover:text-zinc-500 transition-colors tracking-widest"
        >
          À PROPOS <ArrowRight size={14} strokeWidth={1.5} />
        </a>
        <a
          href="#"
          className="flex items-center gap-2 font-sans text-xs md:text-[13px] font-semibold text-zinc-900 hover:text-zinc-500 transition-colors tracking-widest"
        >
          FAQ <ArrowRight size={14} strokeWidth={1.5} />
        </a>
        <a
          href="#"
          className="flex items-center gap-2 font-sans text-xs md:text-[13px] font-semibold text-zinc-900 hover:text-zinc-500 transition-colors tracking-widest"
        >
          RÉSERVATION <ArrowRight size={14} strokeWidth={1.5} />
        </a>
      </div>

      {/* Text */}
      <p className="font-sans text-[12px] md:text-[13px] text-zinc-500 text-center max-w-xl mx-auto leading-[1.8] mb-12 md:mb-20 relative z-20 px-4">
        Grâce à notre dévouement et notre expertise dans l'hospitalité, nous
        nous efforçons d'offrir des séjours qui vont au-delà d'une simple
        chambre, en proposant un voyage réconfortant vers la détente et des
        expériences inoubliables.
      </p>

      {/* Bottom Bar & Socials Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 items-center gap-8 md:gap-4 relative z-20">
        <div className="text-center md:text-left font-sans text-[13px] md:text-sm text-zinc-900 tracking-wide">
          Assistance : +243 978 567 778
        </div>

        <div className="flex justify-center items-center gap-4">
          {[
            { icon: Instagram, isCustom: false },
            { icon: Youtube, isCustom: false },
            { icon: TiktokIcon, isCustom: true },
          ].map((Item, i) => (
            <a
              key={i}
              href="#"
              className="w-11 h-11 md:w-12 md:h-12 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-900 hover:border-zinc-900 hover:bg-zinc-900 hover:text-white transition-all duration-300"
            >
              {Item.isCustom ? (
                <Item.icon size={16} />
              ) : (
                <Item.icon size={18} strokeWidth={1.5} />
              )}
            </a>
          ))}
        </div>

        <div className="text-center md:text-right font-sans text-[13px] md:text-sm text-zinc-900 tracking-wide">
          © {new Date().getFullYear()} Mia. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
};
