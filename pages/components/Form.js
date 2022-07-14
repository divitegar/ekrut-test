import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addData, clearData } from "../../src/redux/basicInformation/action";
import {
  addEducation,
  deleteEducation,
  clearEducation,
} from "../../src/redux/Education/action";
import {
  addExperience,
  deleteExperience,
  clearExperience,
} from "../../src/redux/Experience/action";

export default function Form() {
  const state = useSelector((state) => state);

  const dispatch = useDispatch();

  // basic information
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const dataInformation = { fullName, email, phone };

  useEffect(() => {
    dispatch(addData(dataInformation));
  }, [fullName, email, phone]);
  // end basic information

  // education list
  const [educationList, setEducationList] = useState([
    { school: "", major: "", start_date: "", end_date: "" },
  ]);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...educationList];
    list[index][name] = value;
    setEducationList(list);
    dispatch(addEducation(educationList));
  };

  const addEducationItem = () => {
    setEducationList([
      ...educationList,
      { school: "", major: "", start_date: "", end_date: "" },
    ]);
  };

  const handleRemoveClick = (index) => {
    const list = [...educationList];
    list.splice(index, 1);
    setEducationList(list);
    dispatch(deleteEducation(index));
  };

  // end education list

  // experience list

  const [experienceList, setExperienceList] = useState([
    { company: "", title: "", start_date: "", end_date: "" },
  ]);

  const handleInputExperience = (e, index) => {
    const { name, value } = e.target;
    const list = [...experienceList];
    list[index][name] = value;
    setExperienceList(list);
    dispatch(addExperience(experienceList));
  };

  const addExperienceItem = () => {
    setExperienceList([
      ...experienceList,
      { company: "", title: "", start_date: "", end_date: "" },
    ]);
  };

  const handleRemoveExperience = (index) => {
    const list = [...experienceList];
    list.splice(index, 1);
    setExperienceList(list);
    dispatch(deleteExperience(index));
  };

  // end experience list

  // handle submit
  const handleSubmit = async () => {
    const dataEduState = state.education.data;
    const dataExpState = state.experience.data;
    try {
      const resUser = await axios.post(
        "http://hr.ekrut.co/items/users",
        state.basicInformation.data
      );

      if (dataEduState.length > 0) {
        const resEducation = await axios.post(
          "http://hr.ekrut.co/items/education",
          dataEduState.map((i) => ({ ...i, user_id: resUser.data.data.id }))
        );
      }

      if (dataEduState.length > 0) {
        const resExperience = await axios.post(
          "http://hr.ekrut.co/items/experience",
          dataExpState.map((i) => ({ ...i, user_id: resUser.data.data.id }))
        );
      }
      alert("data berhasil disimpan");
    } catch (error) {
      if (error) {
        alert("email sudah digunakan");
      }
    }
    setFullName("");
    setEmail("");
    setPhone("");
    dispatch(clearData());
    dispatch(clearExperience());
    dispatch(clearEducation());

    setEducationList([{ school: "", major: "", start_date: "", end_date: "" }]);
    setExperienceList([
      { company: "", title: "", start_date: "", end_date: "" },
    ]);
  };

  // end handle submit

  return (
    <div className="p-2 md:px-72 md:py-20">
      <div className="border border-black w-full h-full rounded-lg shadow-xl p-10 bg-white">
        <div className="font-bold text-primary-blue mb-3 text-lg">
          Basic Information
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="text-primary-blue">Full Name</label>
              <input
                placeholder="masukkan nama lengkap"
                className="w-full outline-none p-1 rounded-md outline-gray-300 focus:outline-primary-blue mt-2"
                type="text"
                onChange={(e) => setFullName(e.target.value)}
                value={fullName}
                required
              />
              <span className="absolute ml-2 text-red-600 text-xl">*</span>
            </div>
            <div>
              <label className="text-primary-blue">Email</label>
              <input
                placeholder="masukkan email"
                className="w-full outline-none p-1 rounded-md outline-gray-300 focus:outline-primary-blue mt-2"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
              <span className="absolute ml-2 text-red-600 text-xl">*</span>
            </div>
            <div>
              <label className="text-primary-blue">Phone Number</label>
              <input
                placeholder="masukkan nomer telepon"
                className="w-full outline-none p-1 rounded-md outline-gray-300 focus:outline-primary-blue mt-2"
                type="tel"
                minLength="9"
                maxLength="13"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                required
              />
              <span className="absolute ml-2 text-red-600 text-xl">*</span>
            </div>
          </div>
          <div className="mt-5">
            {educationList.map((item, index) => {
              return (
                <div key={index}>
                  <div className="font-bold text-primary-blue mt-3 text-lg">
                    Education
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="text-primary-blue">School</label>
                      <input
                        placeholder="masukkan instansi pendidikan"
                        name="school"
                        value={item.school}
                        className="w-full outline-none rounded-md outline-gray-300 focus:outline-primary-blue mt-2 p-1"
                        type="text"
                        onChange={(e) => handleInputChange(e, index)}
                      />
                    </div>
                    <div>
                      <label className="text-primary-blue">Major</label>
                      <input
                        placeholder="masukkan jurusan pendidikan"
                        className="w-full outline-none rounded-md outline-gray-300 focus:outline-primary-blue mt-2 p-1"
                        type="text"
                        name="major"
                        value={item.major}
                        onChange={(e) => handleInputChange(e, index)}
                      />
                    </div>
                    <div>
                      <label className="text-primary-blue">Start Date</label>
                      <input
                        className="w-full outline-none rounded-md outline-gray-300 focus:outline-primary-blue mt-2 p-1"
                        type="date"
                        name="start_date"
                        value={item.start_date}
                        onChange={(e) => handleInputChange(e, index)}
                      />
                    </div>
                    <div>
                      <label className="text-primary-blue">End Date</label>
                      <input
                        className="w-full outline-none rounded-md outline-gray-300 focus:outline-primary-blue mt-2 p-1"
                        type="date"
                        name="end_date"
                        value={item.end_date}
                        onChange={(e) => handleInputChange(e, index)}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    {educationList.length - 1 === index && (
                      <button
                        type="button"
                        className="mt-4 px-4 py-2 border bg-primary-blue text-white rounded-md"
                        onClick={() => {
                          addEducationItem();
                        }}
                      >
                        Add New
                      </button>
                    )}

                    {educationList?.length !== 1 && (
                      <button
                        type="button"
                        className="mt-4 px-4 py-2 border bg-red-600 text-white rounded-md ml-2"
                        onClick={() => handleRemoveClick(index)}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-5">
            {experienceList.map((item, index) => {
              return (
                <div key={index}>
                  <div className="font-bold text-primary-blue mt-3 text-lg">
                    Experience
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="text-primary-blue">Company</label>
                      <input
                        placeholder="masukkan instansi pendidikan"
                        className="w-full outline-none rounded-md outline-gray-300 focus:outline-primary-blue mt-2 p-1"
                        type="text"
                        name="company"
                        value={item.company}
                        onChange={(e) => handleInputExperience(e, index)}
                      />
                    </div>
                    <div>
                      <label className="text-primary-blue">Title</label>
                      <input
                        placeholder="masukkan jurusan pendidikan"
                        className="w-full outline-none rounded-md outline-gray-300 focus:outline-primary-blue mt-2 p-1"
                        type="text"
                        name="title"
                        value={item.title}
                        onChange={(e) => handleInputExperience(e, index)}
                      />
                    </div>
                    <div>
                      <label className="text-primary-blue">Start Date</label>
                      <input
                        className="w-full outline-none rounded-md outline-gray-300 focus:outline-primary-blue mt-2 p-1"
                        type="date"
                        name="start_date"
                        value={item.start_date}
                        onChange={(e) => handleInputExperience(e, index)}
                      />
                    </div>
                    <div>
                      <label className="text-primary-blue">End Date</label>
                      <input
                        className="w-full outline-none rounded-md outline-gray-300 focus:outline-primary-blue mt-2 p-1"
                        type="date"
                        name="end_date"
                        value={item.end_date}
                        onChange={(e) => handleInputExperience(e, index)}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    {experienceList.length - 1 === index && (
                      <button
                        type="button"
                        className="mt-4 px-4 py-2 border bg-primary-blue text-white rounded-md"
                        onClick={() => {
                          addExperienceItem();
                        }}
                      >
                        Add New
                      </button>
                    )}

                    {experienceList?.length !== 1 && (
                      <button
                        type="button"
                        className="mt-4 px-4 py-2 border bg-red-600 text-white rounded-md ml-2"
                        onClick={() => handleRemoveExperience(index)}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <input
            type="submit"
            value="save"
            className="mt-10 border w-full cursor-pointer border-primary-blue rounded-lg bg-primary-blue text-white p-2"
          />
        </form>
      </div>
    </div>
  );
}
