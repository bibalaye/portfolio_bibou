'use client';

import { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import { Info, ProjectInfo, SkillInfo, ExperienceInfo } from "./User";
import { motion, AnimatePresence } from "framer-motion";
import Typewriter from 'typewriter-effect';
import AnimatedNav from './components/AnimatedNav';
import Footer from './components/footer';

export default function HomeClient() {
  const [selectedProject, setSelectedProject] = useState<typeof ProjectInfo[0] | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isLoading, setIsLoading] = useState(true);

  // Utilisez useEffect pour le chargement initial
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  const openProjectModal = useCallback((project: typeof ProjectInfo[0]) => {
    setSelectedProject(project);
  }, []);

  const closeProjectModal = useCallback(() => {
    setSelectedProject(null);
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Formulaire soumis:', formData);
    setFormData({ name: '', email: '', message: '' });
  }, [formData]);

  // Mémorisez les sections qui ne changent pas fréquemment
  const projectsSection = useMemo(() => (
    <section id="projets" className="bg-lm-background dark:bg-dm-background p-4 sm:p-6 md:p-8 lg:p-16 rounded-3xl shadow-2xl">
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 sm:mb-6 md:mb-8 lg:mb-12 text-center text-lm-text-primary dark:text-dm-text-primary"
      >
        Projets Innovants
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, staggerChildren: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10"
      >
        {ProjectInfo.map((project, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05, rotate: 1 }}
            whileTap={{ scale: 0.95 }}
            className="bg-lm-border dark:bg-dm-border rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer"
            onClick={() => openProjectModal(project)}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="relative w-full h-32 sm:h-40 md:h-48 lg:h-56 mb-3 sm:mb-4 md:mb-5 lg:mb-6 overflow-hidden rounded-xl"
            >
              <Image
                src={`/${project.image}`}
                alt={project.title}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 hover:scale-110"
              />
            </motion.div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 md:mb-4 text-lm-text-primary dark:text-dm-text-primary">{project.title}</h3>
            <p className="text-lm-text-secondary dark:text-dm-text-secondary line-clamp-3 text-xs sm:text-sm md:text-base">{project.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  ), [openProjectModal]);

  const skillsSection = useMemo(() => (
    <section id="compétences" className="mb-8 sm:mb-20 bg-lm-background dark:bg-dm-background p-4 sm:p-6 md:p-10 lg:p-16 rounded-3xl shadow-2xl">
      <motion.h2
        initial={{ y: -50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 sm:mb-8 md:mb-12 lg:mb-16 text-center text-lm-text-primary dark:text-dm-text-primary"
      >
        Expertise Technique
      </motion.h2>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1, staggerChildren: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10"
      >
        {SkillInfo.map((skillCategory, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            className="bg-lm-border dark:bg-dm-border p-4 sm:p-6 md:p-8 lg:p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 md:mb-8 text-center text-lm-text-primary dark:text-dm-text-primary">{skillCategory.title}</h3>
            <motion.ul className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
              {skillCategory.skills.map((skill, skillIndex) => (
                <motion.li
                  key={skillIndex}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: skillIndex * 0.1, duration: 0.5 }}
                  className="flex flex-col items-center group w-full"
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="mb-2"
                  >
                    <Image
                      src={`/Icons/${skill}.png`}
                      alt={`Icône ${skill}`}
                      width={40}
                      height={40}
                      className="filter drop-shadow-lg w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
                    />
                  </motion.div>
                  <span className="text-base sm:text-lg md:text-xl lg:text-2xl text-lm-text-primary dark:text-dm-text-primary group-hover:text-accent-electric-blue transition-colors duration-300 text-center">{skill}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        ))}
      </motion.div>
    </section>
  ), []);

  const experienceSection = useMemo(() => (
    <section id="expérience" className="mb-8 sm:mb-12 md:mb-16 lg:mb-20 bg-lm-background dark:bg-dm-background p-4 sm:p-6 md:p-8 lg:p-16 rounded-3xl shadow-2xl">
      <motion.h2
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 sm:mb-8 md:mb-12 lg:mb-16 text-center text-lm-text-primary dark:text-dm-text-primary"
      >
        Parcours Professionnel
      </motion.h2>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1, staggerChildren: 0.3 }}
        className="space-y-8 sm:space-y-12 md:space-y-16"
      >
        {ExperienceInfo.map((experience, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            whileHover={{ scale: 1.02 }}
            className="bg-lm-border dark:bg-dm-border p-4 sm:p-6 md:p-8 lg:p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col items-center"
          >
            <motion.div
              className="mb-4 sm:mb-6"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 1 }}
            >
              <Image
                src={`/${experience.company}.png`}
                alt={`Logo ${experience.company}`}
                width={100}
                height={100}
                className="rounded-full border-4 border-accent-electric-blue shadow-lg"
              />
            </motion.div>
            <div className="text-center">
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 text-lm-text-primary dark:text-dm-text-primary">{experience.role}</h3>
              <p className="text-lg sm:text-xl md:text-2xl font-medium mb-3 sm:mb-4 text-lm-text-primary dark:text-dm-text-primary">{experience.company} | {experience.date}</p>
              <p className="text-base sm:text-lg md:text-xl mb-4 sm:mb-6 leading-relaxed text-lm-text-secondary dark:text-dm-text-secondary">{experience.desc}</p>
              <motion.div
                className="flex flex-wrap justify-center gap-2 sm:gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                {experience.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skillIndex}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="bg-accent-electric-blue text-lm-text-primary px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm md:text-base font-bold shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  ), []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-lm-background dark:bg-dm-background">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="text-4xl sm:text-6xl font-bold text-lm-text-primary dark:text-dm-text-primary text-center px-4"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <Typewriter
              options={{
                strings: [
                  "Bonjour, je suis Abiboulaye Sy. Je vous remercie par avance de visiter mon portfolio."

                ],
                autoStart: true,
                loop: false,
                cursor: '|',
                delay: 100,
              }}
              onInit={(typewriter) => {
                typewriter
                  .pauseFor(1000)
                  .typeString(Info.name)
                  .pauseFor(1000)
                  .callFunction(() => {
                    setTimeout(() => {
                      setIsLoading(false);
                    }, 1000);
                  })
                  .start();
              }}
            />
          </motion.span>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <AnimatedNav />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-grow pt-20 sm:pt-24 bg-lm-background dark:bg-dm-background p-4 sm:p-8 lg:p-12 pb-12"
      >
        <header className="mb-8 sm:mb-20 bg-lm-border dark:bg-dm-border p-4 sm:p-6 md:p-12 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 ease-in-out">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col items-center justify-between"
          >
            <div className="w-full text-lm-text-primary dark:text-dm-text-primary">
              <motion.h1
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, type: "spring", stiffness: 200 }}
                className="text-3xl sm:text-5xl md:text-7xl font-extrabold mb-4 sm:mb-6 md:mb-8 leading-tight text-center"
              >
                {Info.name}
              </motion.h1>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mb-4 sm:mb-6 md:mb-8 flex flex-wrap justify-center"
              >
                {Info.stack.map((item, index) => (
                  <motion.span
                    key={index}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.8 }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="inline-block bg-accent-electric-blue text-lm-text-primary text-xs sm:text-sm font-bold mr-2 mb-2 px-2 py-1 sm:px-3 sm:py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                  >
                    {item}
                  </motion.span>
                ))}
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="text-sm sm:text-base md:text-xl leading-relaxed text-lm-text-secondary dark:text-dm-text-secondary bg-lm-background dark:bg-dm-background shadow-md p-3 sm:p-4 md:p-6 rounded-xl"
              >
                {Info.bio}
              </motion.p>
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, duration: 1, type: "spring", stiffness: 100 }}
              className="mt-6 sm:mt-8 flex justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="relative w-32 h-32 sm:w-48 sm:h-48 md:w-72 md:h-72 rounded-full overflow-hidden border-4 sm:border-6 md:border-8 border-accent-electric-blue shadow-2xl"
              >
                <Image
                  src="/profile.png"
                  alt={Info.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </header>

        <main className="flex flex-col gap-8 sm:gap-16">
          {projectsSection}
          {skillsSection}
          {experienceSection}

          <AnimatePresence>
            {selectedProject && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-lm-background dark:bg-dm-background rounded-3xl p-6 sm:p-8 lg:p-10 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                >
                  <motion.div
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
                    }}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col gap-4 sm:gap-6"
                  >
                    <motion.h2 variants={itemVariant} className="text-3xl sm:text-4xl font-extrabold text-lm-text-primary dark:text-dm-text-primary">{selectedProject.title}</motion.h2>
                    <motion.div variants={itemVariant} className="relative w-full h-64 sm:h-80 md:h-96"> {/* Adjusted height slightly for typical aspect ratios */}
                      {selectedProject.images.map((image, index) => (
                        <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: index === currentImageIndex ? 1 : 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={`/${image}`}
                          alt={`${selectedProject.title} - Image ${index + 1}`}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-2xl"
                        />
                      </motion.div>
                    ))}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 sm:p-3 md:p-4 text-lg sm:text-xl md:text-2xl transition-colors duration-200"
                      onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? selectedProject.images.length - 1 : prev - 1))}
                    >
                      &#8249;
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 sm:p-3 md:p-4 text-lg sm:text-xl md:text-2xl transition-colors duration-200"
                      onClick={() => setCurrentImageIndex((prev) => (prev === selectedProject.images.length - 1 ? 0 : prev + 1))}
                    >
                      &#8250;
                    </motion.button>
                    </motion.div> {/* End of Image Gallery */}
                    <motion.p variants={itemVariant} className="text-lm-text-secondary dark:text-dm-text-secondary leading-relaxed text-base sm:text-lg">{selectedProject.desc}</motion.p>
                    <motion.div variants={itemVariant} className="flex flex-wrap gap-2 sm:gap-3"> {/* Adjusted gap slightly */}
                      {selectedProject.technologies.map((tech, techIndex) => (
                        <motion.span
                          key={techIndex}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          className="bg-accent-electric-blue/20 text-lm-text-primary dark:bg-accent-electric-blue/30 dark:text-lm-text-primary px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </motion.div> {/* End of Technologies */}
                    <motion.div variants={itemVariant} className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-2"> {/* Added small top margin */}
                      {selectedProject.github && (
                        <motion.a
                          whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={selectedProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-accent-electric-blue text-lm-text-primary px-6 py-2 sm:px-8 sm:py-3 rounded-full hover:bg-opacity-90 transition font-bold text-base sm:text-lg w-full sm:w-auto text-center"
                      >
                        Voir le code
                      </motion.a>
                    )}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={closeProjectModal}
                      className="bg-lm-text-secondary dark:bg-dm-text-secondary text-lm-background dark:text-dm-background px-6 py-2 sm:px-8 sm:py-3 rounded-full hover:bg-opacity-90 transition font-bold text-base sm:text-lg w-full sm:w-auto"
                    >
                          Fermer
                      </motion.button>
                    </motion.div> {/* End of Buttons container */}
                  </motion.div> {/* End of Stagger container */}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <section id="contact" className="mb-16 bg-lm-border dark:bg-dm-border p-4 sm:p-8 md:p-12 rounded-3xl shadow-lg">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 sm:mb-6 md:mb-8 text-center text-lm-text-primary dark:text-dm-text-primary"
            >
              Contactez-moi
            </motion.h2>
            <motion.form
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              onSubmit={handleSubmit}
              className="max-w-lg mx-auto w-full px-4 sm:px-0"
            >
              <motion.div
                className="mb-4 sm:mb-6"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <label htmlFor="name" className="block text-base sm:text-lg font-medium text-lm-text-primary dark:text-dm-text-primary mb-2">Nom</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg border-2 border-lm-border dark:border-dm-border focus:border-accent-electric-blue focus:ring focus:ring-accent-electric-blue/50 transition-all duration-300 bg-lm-background dark:bg-dm-background text-lm-text-primary dark:text-dm-text-primary placeholder-lm-text-secondary dark:placeholder-dm-text-secondary text-sm sm:text-base"
                  required
                  placeholder="Votre nom"
                />
              </motion.div>
              <motion.div
                className="mb-4 sm:mb-6"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <label htmlFor="email" className="block text-base sm:text-lg font-medium text-lm-text-primary dark:text-dm-text-primary mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg border-2 border-lm-border dark:border-dm-border focus:border-accent-electric-blue focus:ring focus:ring-accent-electric-blue/50 transition-all duration-300 bg-lm-background dark:bg-dm-background text-lm-text-primary dark:text-dm-text-primary placeholder-lm-text-secondary dark:placeholder-dm-text-secondary text-sm sm:text-base"
                  required
                  placeholder="Votre email"
                />
              </motion.div>
              <motion.div
                className="mb-4 sm:mb-6"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <label htmlFor="message" className="block text-base sm:text-lg font-medium text-lm-text-primary dark:text-dm-text-primary mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg border-2 border-lm-border dark:border-dm-border focus:border-accent-electric-blue focus:ring focus:ring-accent-electric-blue/50 transition-all duration-300 bg-lm-background dark:bg-dm-background text-lm-text-primary dark:text-dm-text-primary placeholder-lm-text-secondary dark:placeholder-dm-text-secondary text-sm sm:text-base"
                  required
                  placeholder="Votre message"
                ></textarea>
              </motion.div>
              <motion.button
                type="submit"
                className="w-full bg-accent-electric-blue text-lm-text-primary px-4 py-3 sm:px-6 sm:py-4 rounded-lg hover:bg-accent-electric-blue/80 transition-all duration-300 font-bold text-base sm:text-xl shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Envoyer
              </motion.button>
            </motion.form>
          </section>
        </main>
      </motion.div>
      <Footer />
    </div>
  );
}
