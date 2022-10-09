import React, { useState, useEffect, useCallback, useContext } from "react";
import { useRouter } from "next/router";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

//INTERNAL Import
import { VotingContext } from "../context/Voter";
import Style from "../styles/allowedVoter.module.css";
import images from "../assets";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";

const allowedVoters = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const [candidateform, setCandidateForm] = useState({
    name: "",
    address: "",
    age: "",
  });

  const router = useRouter();
  const { setcandidate ,uploadToIPFSCandidate ,candidateArray,getNewCandidate } = useContext(VotingContext);
  //----------VOTERS IMAGE DROP
  const onDrop = useCallback(async (acceptedFil) => {
    const url = await uploadToIPFSCandidate(acceptedFil[0]);
    setFileUrl(url);
  });

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpeg', '.png'],
    }
  });

  useEffect(() => {
    getNewCandidate();
    },[]);
  //---JSX PART
  return (
    <div className={Style.createVoter}>
      <div>
        {fileUrl && (
            <div className={Style.voterInfo}>
              <img src={fileUrl} alt="Voter Image"/>
              <div className={Style.voterInfo_paragraph}>
                <p>
                  Name: <span> {candidateform.name}</span>
                </p>
                <p>
                  Add:&nbps;  <span>{candidateform.slice(0, 20)}</span>
                </p>
                <p>
                  age:&nbps;  <span>{candidateform.age}</span>
                </p>
              </div>
            </div>
          )}
      </div>

      <div>
        
      </div> 

        {!fileUrl && (
          <div className={Style.sideInfo}>
            <div className={Style.sideInfo_box}>
              <h4>Create canditate For voting</h4>
              <p>Blockchain voting orgainzation, provide ethereum eco-system</p>
              <p className={Style.sideInfo_para}>Contract Candidate</p>
            </div>

            <div className={Style.card}>
               {candidateArray.map((eL, i) => (
            <div key = {i + 1} className={Style.card_box}>
             <div className = {Style.image}>
             <img src ={[3]} alt="Profi1e photo"/>
             </div>

               <div className={Style.card_info} >
                <p>{eL[1]} #{eL[2]}.toNumber()</p>
                <p>{eL[0]}</p>
                <p>{eL[6].slice(0,10)}..</p>
            
             </div>
             
            </div>

          ))} 
            </div>

            <div className={Style.voter}>
              <div className={Style.voter__container}>
                <h1>Create New Candidate</h1>
                <div className={Style.voter__container__box}>
                  <div className={Style.voter__container__box__div}>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />

                      <div className={Style.voter__container__box__div__info}>
                        <p>Upload File: JPG, PNG, GIF, WEBM Max 10MB </p>
                        <div
                          className={Style.voter__container__box__div__image}
                        >
                          <Image
                            src={images.upload}
                            width={150}
                            height={150}
                            objectFit="contain"
                            alt="File upload"
                          />
                        </div>
                        <p> Drag & Drop File </p>
                        <p>or Browse Media on you device</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={Style.input__container}>
                <Input
                  inputType="text"
                  title="Name"
                  placeholder="Voter Name"
                  handleClick={(e) =>
                    setCandidateForm({ ...candidateform, name: e.target.value })
                  }
                />
                <Input
                  inputType="text"
                  title="Address"
                  placeholder="Voter Address"
                  handleClick={(e) =>
                    setCandidateForm({ ...candidateform, address: e.target.value })
                  }
                />
                <Input
                  inputType="text"
                  title="Position"
                  placeholder="Voter Position"
                  handleClick={(e) =>
                    setCandidateForm({ ...candidateform, age: e.target.value })
                  }
                />


                <div className={Style.Button}>
                  <Button btnName="Authorized Candidate" handleClick={() =>setcandidate ( candidateform,fileUrl, router)} />
                </div>
              </div>
            </div>

            {/* ////////////////////// */}
            <div className={Style.createdVoter}>
              <div className={Style.createdVoter__info}>
                <Image src={images.creator} alt="user Profile" />
                <p>Notice For user</p>
                <p>
                  Organizer <span>0X939939..</span>
                </p>
                <p>
                  Only organizer of the voting contract can create voter for voting election
                </p>
              </div>
            </div>  


          </div>
        )}
    </div>
  );
};

export default allowedVoters;