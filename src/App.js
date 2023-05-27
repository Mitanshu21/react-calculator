import Calculator from "./components/Calculator";
import { useEffect } from "react";
export default function App() {
  useEffect(() => {
    const onKeyDown = (e) => { //try with switch
      if (e.code === 'Enter') {
        e.preventDefault();
        document.getElementById("equalbtn").click();
      }
      else if(e.code === 'KeyC'){
        e.preventDefault();
        document.getElementById('clr').click();
      }
      else if(e.code === 'KeyA'){
        e.preventDefault();
        document.getElementById('clrAll').click();
      }
      else{
        const btns = document.querySelectorAll('.btn:not(.exp, .clr)');
        for(const btn of btns){ //try whit Array.from -- .find()
          if(btn.textContent === e.key){
            btn.click();
            break;
          }
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