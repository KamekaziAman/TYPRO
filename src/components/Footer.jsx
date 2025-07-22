import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faGithub, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Add icons to library
library.add(faGithub, faTwitter, faInstagram, faEnvelope);

function Footer() {
  return (
    <footer className="py-4 px-10 flex justify-between items-center border-t border-[#eeeeee]">
      <div className="flex justify-center items-center gap-5 text-gray-400">
      <a
          href="https://mail.google.com/mail/u/0/?fs=1&to=amanrai02122004@gmail.com&tf=cm"
          className="hover:text-white transition flex items-center gap-2"
          target="_blank"
        >
          <FontAwesomeIcon icon={['fas', 'envelope']} />
          <span>Mail</span>

        </a>
        <a
          href="https://github.com/KamekaziAman"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition flex items-center gap-2"
        >
          <FontAwesomeIcon icon={['fab', 'github']} />
          <span>Github</span>

        </a>
        <a
          href="https://x.com/home"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition flex items-center gap-2"
        >
          <FontAwesomeIcon icon={['fab', 'twitter']} />
          <span>Twitter</span>

        </a>
        <a
          href="https://www.instagram.com/aman_k.kazi/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition flex items-center gap-2"
        >
          <FontAwesomeIcon icon={['fab', 'instagram']} />
          <span>Instagram</span>
        </a>
        
      </div>
      <p className="text-gray-400 text-sm text-center">© Kazi 2025</p>
    </footer>
  );
}

export default Footer;
