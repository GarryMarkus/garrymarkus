"use client";

import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/config";
import { FileText, Mail, ArrowRight, ArrowUpRight } from "lucide-react";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="canvas-card">
      <div className="theme-grid">
        
        {/* ── ROW 1: HEADER & WORDMARK ──────────────────────── */}
        <div className="grid-cell cell-align-top header-cell hidden md:flex">
          {/* Empty left gutter cell */}
        </div>
        
        <div className="grid-cell cell-align-top header-cell">
          {/* Keep empty for now */}
        </div>
        
        <div className="grid-cell cell-align-top header-cell">
          {/* Keep empty for now */}
        </div>

        {/* ── ROW 2: HERO TITLE ─────────────────────────────── */}
        <div className="grid-cell hidden md:flex">
          {/* Empty left gutter cell */}
        </div>
        
        <div className="grid-cell span-cols-2">
          <div className="hero-salutation">Hello web explorer,</div>
          <h1 className="hero-name">
            I'm Garry<span className="hero-asterisk">*</span>
          </h1>
        </div>

        {/* ── ROW 3: BIO & INTERACTIVE ACTIONS ───────────────── */}
        <div className="grid-cell hidden md:flex">
          {/* Empty left gutter cell */}
        </div>
        
        <div className="grid-cell cell-align-top">
          <p className="body-lead">
            Hi! I'm a security engineer, chess enthusiast, and systems builder. 
            Every day I analyze attack surfaces, write robust code, and play 1.e4 
            to find the best solutions possible. It's beautiful to turn complexity 
            into clarity, don't you think?
          </p>
        </div>
        
        <div className="grid-cell cell-align-top">
          <div className="link-list">
            
            <a 
              href={siteConfig.resumePath} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="link-item group"
            >
              <FileText className="w-5 h-5" />
              <span>
                If you want my <span className="link-accent">resume**</span>
              </span>
            </a>
            
            <a 
              href={siteConfig.contact.x} 
              target="_blank"
              rel="noopener noreferrer"
              className="link-item group"
            >
              <svg className="w-5 h-5 text-neutral-500 group-hover:text-[var(--accent-blue)] transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
              <span>
                Or let's <span className="link-accent text-neutral-900 border-neutral-950">have a chat</span>
              </span>
            </a>

            <Link 
              href="/blog" 
              className="link-item group"
            >
              <ArrowRight className="w-5 h-5" />
              <span>
                Read my <span className="link-accent">selected writing</span>
              </span>
            </Link>

          </div>
        </div>

        {/* ── ROW 4: FOOTNOTES ──────────────────────────────── */}
        <div className="grid-cell hidden md:flex">
          {/* Empty left gutter cell */}
        </div>
        
        <div className="grid-cell">
          {/* Keep empty for now */}
        </div>
        
        <div className="grid-cell">
          {/* Keep empty for now */}
        </div>



        {/* ── SOCIALS SIDEBAR (Spans all columns on RHS) ────── */}
        <aside className="socials-sidebar">
          
          <a 
            href={siteConfig.contact.github} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-vertical-link relative"
          >
            Github
            
            {/* Handwritten annotation pointing to GitHub */}
            <div className="annotation-container">
              <span className="annotation-text">Very cool !</span>
              <svg className="annotation-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </a>
          
          <a 
            href={siteConfig.contact.linkedin} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-vertical-link"
          >
            Linkedin
          </a>
          
          <a 
            href={`mailto:${siteConfig.contact.email}`} 
            className="social-vertical-link"
          >
            Gmail
          </a>
          
        </aside>

      </div>
    </div>
  );
}
