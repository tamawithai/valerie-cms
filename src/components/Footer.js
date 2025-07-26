export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-8 mt-16">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600">
              &copy; {new Date().getFullYear()} Valerie CMS. All rights reserved.
            </p>
          </div>
          
          <div>
            <p className="text-gray-600">
              Dibuat dengan ❤️ oleh tamawithai
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}