import { Canvas,useFrame } from "@react-three/fiber"
import { useRef } from "react"


function Spin({position,p}){
const ref=useRef()
  console.log(position,p)
   useFrame((state,delta) => {
    ref.current.rotation.x += delta
    ref.current.rotation.y += delta
  })

  return(
       <mesh position={position} ref={ref}>
          <boxGeometry />
          <meshStandardMaterial color={"orange"}/>
        </mesh>
  )
}

const App = () => {
  return (
    <Canvas>
         <directionalLight position={[0, 0, 2]}/>
          <Spin position={[0,0,1]} p={[1,2]}/>
    </Canvas>
  )
}

export default App