function Footer() {
  return (
    <footer className="w-full bg-black  bg-white/10 backdrop-blur-md shadow-mdtext-white text-sm py-4 mt-16 border-t border-cyan-600/20 shadow-inner">
      <div className="flex flex-col items-center justify-center space-y-1">
        <p className="text-cyan-400 font-semibold tracking-wide">
          © {new Date().getFullYear()} Earth Explorer
        </p>
        <p className="text-white/70">Crafted by <span className="text-cyan-300 font-medium">JS Munasinghe</span></p>
      </div>
    </footer>
  );
}

export default Footer;
