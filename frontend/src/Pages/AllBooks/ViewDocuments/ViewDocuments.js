import React, { useState, useEffect } from "react";
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

  const navigate=useNavigate();
  const [content, setContent] = useState();


  const [Title, setTitle] = useState('');


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
        setTitle(res.data.single_document.document_title);
        setContent(res.data.single_document.document_contents);
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
                  {/* <div className="my-3"> */}
                  {/* <input
                    type="text"
                    name="Title"
                    className="form-control-lg col-12 border-1 border-dark outline-0 ms-2 me-2 "
                    id="editInp"
                    value={Title}
                  />
                  </div> */}
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
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 cpl-md-5 col-sm-12 col-12">
              <div className="all-news-notice-card-div">
                <div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default EditDocuments; 