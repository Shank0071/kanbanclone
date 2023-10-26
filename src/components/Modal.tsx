function Modal({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute top-0 left-0 min-h-screen w-screen z-10 bg-black/90">
      <div className="flex items-center justify-center w-full h-screen">
        <div className="flex items-center justify-center bg-slate-600 text-white z-20 p-2 rounded-md">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
