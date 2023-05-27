import Calculator from "./components/Calculator";
import { useEffect } from "react";
export default function App() {
  useEffect(() => {
    const onKeyDown = (e) => {
      console.log(e);
      const btns = document.querySelectorAll('.btn');
      for(const btn of btns){ //try whit Array.from -- .find()
        if(btn.textContent === e.key || btn.dataset.key === e.key){
          e.preventDefault();
          btn.click();
          console.log(btn);
          break;
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => document.removeEventListener('keydown', onKeyDown);

  }, []);
  

  return (
    <Calculator/>
  );
}