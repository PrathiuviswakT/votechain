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
  const [formInput, setFormInput] = useState({
    name: "",
    address: "",
    position: "",
  });

  const router = useRouter();
  const { uploadToIPFS ,createVoter,voterArray,getAllVoterData} = useContext(VotingContext);
  //----------VOTERS IMAGE DROP
  const onDrop = useCallback(async (acceptedFil) => {
    const url = await uploadToIPFS(acceptedFil[0]);
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
                  Name: <span> {formInput.name}</span>
                </p>
                <p>
                  Add:  <span>{formInput.address.slice(0, 20)}</span>
                </p>
                <p>
                  Pos:  <span>{formInput.position}</span>
                </p>
              </div>
            </div>
          )}
      </div>

      <div>
        
        {!fileUrl && (
          <div className={Style.sideInfo}>
            <div className={Style.sideInfo_box}>
              <h4>Create canditate For voting</h4>
              <p>Blockchain voting orgainzation, provide ethereum eco-system</p>
              <p className={Style.sideInfo_para}>Contract Candidate</p>
            </div>

            <div className={Style.card}>
               {voterArray.map((eL, i) => (
            <div key = {i + 1} className={Style.card_box}>
             <div className = {Style.image}>
             <img src ={eL[4]} alt="Profi1e photo"/>
             </div>

               <div className={Style.card_info} >
                <p>{eL[1]}</p>
               <p>Address : {eL[3].slice(0,10)}...</p>
                
               
             </div>
            </div>

          ))} 
            </div>

            <div className={Style.voter}>
              <div className={Style.voter__container}>
                <h1>Create New Voter</h1>
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
                    setFormInput({ ...formInput, name: e.target.value })
                  }
                />
                <Input
                  inputType="text"
                  title="Address"
                  placeholder="Voter Address"
                  handleClick={(e) =>
                    setFormInput({ ...formInput, address: e.target.value })
                  }
                />
                <Input
                  inputType="text"
                  title="Position"
                  placeholder="Voter Position"
                  handleClick={(e) =>
                    setFormInput({ ...formInput, position: e.target.value })
                  }
                />


                <div className={Style.Button}>
                  <Button btnName="Authorized Voter" handleClick={() => (formInput,fileUrl, filerouter)} />
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
    </div>
  );
};

export default allowedVoters;
