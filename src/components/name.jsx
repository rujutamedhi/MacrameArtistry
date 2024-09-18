import React from 'react'
import './name.css'
import girl from '../images/girl.png'
import flower from'../images/flower.png'
import { motion } from "framer-motion";
export default function name() {
  return (
    <div>
        
      <h1>KnotIt.</h1>
      <motion.img
      className="flower"
      src={flower}
      alt="Rotating"
      
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
    />
      <motion.img
      className='girl'
      src={girl}
      alt="Moving"
      
      animate={{
        x: [0, 0, 1, -1, 0],  // Moves horizontally
        y: [0, -2, 2, 0, 0],    // Moves vertically
      }}
      transition={{
        duration: 6,              // Duration of one full cycle
        repeat: Infinity,         // Repeat animation infinitely
        ease: "easeInOut",        // Smooth easing
      }}
    />
      
      
    </div>
    
  )
}
