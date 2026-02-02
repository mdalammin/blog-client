import React from "react";
import { motion } from "framer-motion";
import { FaChalkboardTeacher, FaDollarSign, FaClock } from "react-icons/fa";

const FeaturesSection = () => {
  return (
    <section className="relative py-16 overflow-hidden md:mb-48 -mb-20 lg:-mb-10">
      {/* Animated Blue Gradient Background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%)",
            "linear-gradient(135deg, #60a5fa 0%, #1e3a8a 50%, #3b82f6 100%)",
            "linear-gradient(135deg, #3b82f6 0%, #60a5fa 50%, #1e3a8a 100%)",
            "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%)",
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Subtle floating shapes for depth */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-20 -left-20 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 -right-20 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-20 left-1/2 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          animate={{
            x: [0, 60, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Diagonal Shadow Line Effect (like in the image) */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {/* Main shadow line */}
        <motion.div
          className="absolute"
          initial={{ 
            x: "-100%", 
            y: "-50%",
            rotate: 45 
          }}
          animate={{ 
            x: "200%", 
            y: "150%",
            rotate: 45 
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 1
          }}
          style={{
            width: "200%",
            height: "10px",
            background: `
              linear-gradient(
                to right,
                transparent 0%,
                rgba(255, 255, 255, 0.03) 10%,
                rgba(255, 255, 255, 0.1) 20%,
                rgba(255, 255, 255, 0.15) 30%,
                rgba(255, 255, 255, 0.2) 40%,
                rgba(255, 255, 255, 0.2) 50%,
                rgba(255, 255, 255, 0.15) 60%,
                rgba(255, 255, 255, 0.1) 70%,
                rgba(255, 255, 255, 0.03) 80%,
                transparent 100%
              )
            `,
            boxShadow: `
              0 0 40px 20px rgba(255, 255, 255, 0.1),
              0 0 80px 40px rgba(255, 255, 255, 0.05)
            `,
            filter: "blur(1px)",
          }}
        />
        
        {/* Secondary shadow line (softer) */}
        <motion.div
          className="absolute"
          initial={{ 
            x: "-150%", 
            y: "-50%",
            rotate: 45 
          }}
          animate={{ 
            x: "150%", 
            y: "150%",
            rotate: 45 
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear",
            delay: 0.3,
            repeatDelay: 1
          }}
          style={{
            width: "200%",
            height: "80px",
            background: `
              linear-gradient(
                to right,
                transparent 0%,
                rgba(255, 255, 255, 0.02) 15%,
                rgba(255, 255, 255, 0.06) 30%,
                rgba(255, 255, 255, 0.08) 45%,
                rgba(255, 255, 255, 0.08) 55%,
                rgba(255, 255, 255, 0.06) 70%,
                rgba(255, 255, 255, 0.02) 85%,
                transparent 100%
              )
            `,
            boxShadow: `
              0 0 30px 15px rgba(255, 255, 255, 0.05)
            `,
            filter: "blur(2px)",
          }}
        />
        
        {/* Glow particles effect */}
        <div className="absolute inset-0">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-24 bg-white/10 rounded-full"
              initial={{ 
                x: "-10%", 
                y: "-50%",
                rotate: 45,
                opacity: 0 
              }}
              animate={{ 
                x: "110%", 
                y: "150%",
                rotate: 45,
                opacity: [0, 0.6, 0] 
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
                delay: i * 1.2,
                times: [0, 0.5, 1]
              }}
              style={{
                boxShadow: "0 0 20px 5px rgba(255, 255, 255, 0.3)",
                filter: "blur(0.5px)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Static diagonal pattern (for context) */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(45deg, white 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 px-6 z-10">
        {/* Left Text Content */}
        <motion.div
          className="flex-1 z-10"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold mb-4 text-white">Our Best Features</h2>
          <p className="text-blue-100 mb-6">
            Special wedding garments are often worn, and the ceremony is sometimes 
            followed by a wedding reception. Music, poetry.
          </p>

          {/* Feature 1 */}
          <div className="flex gap-4 mb-6 items-center">
            <div className="text-white text-4xl bg-gradient-to-r from-blue-500 to-cyan-400 p-3 rounded-full shadow-lg">
              <FaChalkboardTeacher />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-white">Skilled Teachers</h3>
              <p className="text-blue-100">
                Special wedding garments are often worn, and the ceremony is 
                sometimes followed by a wedding reception. Music, poetry, 
                prayers, or readings from.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex items-center gap-4 mb-6">
            <div className="text-white text-4xl bg-gradient-to-r from-blue-500 to-cyan-400 p-3 rounded-full shadow-lg">
              <FaDollarSign />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-white">Affordable Courses</h3>
              <p className="text-blue-100">
                Special wedding garments are often worn, and the ceremony is 
                sometimes followed by a wedding reception. Music, poetry, 
                prayers, or readings from.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex items-center gap-4">
            <div className="text-white text-4xl bg-gradient-to-r from-blue-500 to-cyan-400 p-3 rounded-full shadow-lg">
              <FaClock />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-white">Efficient & Flexible</h3>
              <p className="text-blue-100">
                Special wedding garments are often worn, and the ceremony is 
                sometimes followed by a wedding reception. Music, poetry, 
                prayers, or readings from.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right Image Content */}
        <motion.div
          className="flex-1 z-10"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative group">
            {/* Container with glow effect */}
            <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-blue-500/20 to-cyan-400/20 opacity-30 blur-xl group-hover:opacity-50 transition-opacity duration-500"></div>
            
            {/* Shadow line effect on image container */}
            <div className="absolute inset-0 overflow-hidden rounded-lg">
              <motion.div
                className="absolute"
                initial={{ 
                  x: "-100%", 
                  y: "-50%",
                  rotate: 45 
                }}
                animate={{ 
                  x: "100%", 
                  y: "150%",
                  rotate: 45 
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 0.5
                }}
                style={{
                  width: "100%",
                  height: "40px",
                  background: `
                    linear-gradient(
                      to right,
                      transparent 0%,
                      rgba(255, 255, 255, 0.15) 30%,
                      rgba(255, 255, 255, 0.25) 50%,
                      rgba(255, 255, 255, 0.15) 70%,
                      transparent 100%
                    )
                  `,
                  filter: "blur(0.5px)",
                }}
              />
            </div>
            
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;