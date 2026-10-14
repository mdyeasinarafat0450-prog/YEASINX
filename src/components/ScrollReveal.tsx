"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  className?: string;
  once?: boolean;
}

export function ScrollReveal({
  children,
  delay = 0,
  duration = 0.65,
  direction = "up",
  distance = 24,
  className = "",
  once = false,
}: ScrollRevealProps) {
  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { y: distance, x: 0 };
      case "down":
        return { y: -distance, x: 0 };
      case "left":
        return { x: distance, y: 0 };
      case "right":
        return { x: -distance, y: 0 };
      case "none":
      default:
        return { x: 0, y: 0 };
    }
  };

  const initial = {
    opacity: 0,
    ...getInitialPosition(),
  };

  return (
    <motion.div
      initial={initial}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{ once, amount: 0.15 }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // Ultra-smooth deceleration curve with zero jitter
      }}
      style={{
        WebkitFontSmoothing: "antialiased",
        backfaceVisibility: "hidden",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerContainerProps {
  children: React.ReactNode;
  delayChildren?: number;
  staggerChildren?: number;
  className?: string;
  once?: boolean;
}

export function StaggerContainer({
  children,
  delayChildren = 0.05,
  staggerChildren = 0.1,
  className = "",
  once = false,
}: StaggerContainerProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren,
        staggerChildren,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
  yOffset = 20,
}: {
  children: React.ReactNode;
  className?: string;
  yOffset?: number;
}) {
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: yOffset },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  wordClassName?: string;
  once?: boolean;
}

export function TextReveal({
  text,
  className = "",
  delay = 0,
  wordClassName = "",
  once = false,
}: TextRevealProps) {
  const words = text.split(" ");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: delay * i },
    }),
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    hidden: {
      opacity: 0,
      y: 16,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.span
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2 }}
      style={{
        WebkitFontSmoothing: "antialiased",
        backfaceVisibility: "hidden",
      }}
      className={`inline-block overflow-hidden ${className}`}
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          key={index}
          className={`inline-block mr-2.5 ${wordClassName}`}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}
