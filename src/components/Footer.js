export default function Footer() {
  return (
    <footer className="bg-transparent py-8 mt-16">
      <div className="container border-t border-white/10 pt-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} Valerie CMS. All rights reserved.
            </p>
          </div>
          
          <div>
            <p className="text-gray-400">
              Dibuat dengan ❤️ oleh tamawithai
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}