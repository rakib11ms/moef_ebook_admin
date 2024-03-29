import React, { useState, useEffect, useRef } from "react";
import NavigationBa from "../../Shared/NavigationBa/NavigationBa";
import "./ViewDocuments.css";
import JoditEditor from "jodit-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";

const EditDocuments = () => {

  const params = useParams();
  const id = params.id;

  const navigate = useNavigate();
  const [content, setContent] = useState();


  const [Title, setTitle] = useState('');

  const [editData, setEditData] = useState('')
  console.log('edit data', editData)


  // const [inputs, setInputs] = useState({});
  // const handleChange = (event) => {
  //   const name = event.target.name;
  //   const value = event.target.value;
  //   setInputs(values => ({ ...values, [name]: value }))
  // }


  useEffect(() => {
    axios.get(`/api/get-single-document/${id}`).then(res => {
      if (res.data.status === 200) {
        // console.log(res.data.single_document);
        setTitle(res.data.single_document.title);
        setContent(res.data.single_document.contents);
        setEditData(res.data.single_document)
      }
    })
  }, [id])


  return (
    <div>
      <div>
        <section>
          <NavigationBa />
        </section>
        <section className="container-fluid">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="/home">হোম</a></li>
              <li class="breadcrumb-item"><a href="/all-documents">সকল ডকুমেন্টস</a></li>
              <li class="breadcrumb-item active" aria-current="page">ডকুমেন্ট দেখুন</li>
            </ol>
          </nav>
          <div className="row">
            <div className="col-xl-12 col-lg-8 cpl-md-7 col-sm-12 col-12">
              <div className="all-news-notice-tags-input">
                <h5>ডকুমেন্ট দেখুন</h5>
                <div className="d-flex justify-content-around align-items-center">
                  <Link to={`/edit-document/` + id}>
                    <CreateOutlinedIcon className="text-warning" />
                  </Link>
                </div>
              </div>
              <hr />
              <div>
                <div class="mb-3">

                  <div className="my-3">
                    <p>
                      <strong>ডকুমেন্ট শিরোনামঃ </strong>
                      <p>{Title}</p>
                    </p>
                  </div>
                  <hr />


                  <label for="exampleFormControlTextarea1" class="form-label">
                    <strong>ডকুমেন্ট বিস্তারিত: </strong>
                  </label>
                  {/* <JoditEditor
                    className="news-jodit-editor"
                    spellcheck={false}
                    language="en"
                    toolbarAdaptive="false"
                    height="800"
                    autofocus="true"
                    value={content} 
                    config={{ readonly: true }}
                    toolbar={false}
                  /> */}
                  <br />
                  <div dangerouslySetInnerHTML={{ __html: content }}></div>
                </div>
                {
                  editData.file !== null &&
                  <a href={`${global.imageURL}/files/${editData.file}`} download target="_blank" className='download btn btn-warning fw-bold'> ফাইল দেখুন </a>

                }

                <div class="my-4 col-md-6">
                  <label className="fs-6 fw-bold ">ডকুমেন্ট টি কাদের জন্য   </label>
                  {
                    Array.isArray(editData.target_users) ?

                      <table class="table  border-1 ">
                        <thead className="">
                          <tr>
                            <th scope="col">সিরিয়াল </th>
                            <th scope="col">নাম </th>
                            <th scope="col">ফোন </th>
                            <th scope="col">ছবি</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            editData.target_users.map((item, i) => {
                              return (
                                <tr key={i}>
                                  <th scope="row">{i + 1}</th>
                                  <td>{item.UserName}</td>
                                  <td>{item.userPhone}</td>
                                  <td>
                                    <img src={`${global.imageURL}/images/user/${item.userImage}`} style={{ width: '40px', borderRadius: '10%' }} />
                                  </td>
                                </tr>
                              )
                            })
                          }


                        </tbody>
                      </table>
                      :
                      <div className="my-2">
                        <button type="button" className="btn btn-light border px-4 rounded-pill text-success "> {editData.target_users}</button>
                      </div>
                  }
                </div>

              </div>
            </div>
            <div className="col-xl-3 col-lg-4 cpl-md-5 col-sm-12 col-12">
              {/* <div className="all-news-notice-card-div">
                <div>
                </div>
              </div> */}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default EditDocuments; 