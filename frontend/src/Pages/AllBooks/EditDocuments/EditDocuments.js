import React, { useState, useEffect } from "react";
import NavigationBa from "../../Shared/NavigationBa/NavigationBa";
import "./EditDocuments.css";
import JoditEditor from "jodit-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";

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

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  }

  const onContentChange = (newContent) => {
    setContent(newContent);
  }


  useEffect(() => {
    axios.get(`/api/get-single-document/${id}`).then(res => {
      if (res.data.status === 200) {
        // console.log(res.data.single_document);
        setTitle(res.data.single_document.document_title);
        setContent(res.data.single_document.document_contents);
      }
    })
  }, [id])

  const handleSubmit = (e) => {
    e.preventDefault();

    e.preventDefault();

    const formData = new FormData();
    formData.append('document_title', Title);
    formData.append('document_contents', content);

    axios.post(`/api/update-single-document/${id}`, formData).then(res => {
      if (res.data.status === 200) {
        console.log(res.data);
        Swal.fire({
          icon: 'success',
          title: 'সফলভাবে সংশোধন করা হয়েছে',
          showConfirmButton: false,
          timer: 1500
        })
        navigate('/all-documents');
      }
    })
  }


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
                <h5>ডকুমেন্ট সম্পাদনা</h5>

              </div>
              <hr />
              <div>
                <div class="mb-3">
                  <div className="my-3">
                  <input
                    type="text"
                    name="Title"
                    className="form-control-lg col-12 border-1 border-dark outline-0 ms-2 me-2 "
                    placeholder="ডকুমেন্ট সম্পাদনা করুন "
                    id="editInp"
                    value={Title}
                    onChange={onTitleChange}
                  />
                  </div>
          

                  <label for="exampleFormControlTextarea1" class="form-label">
                    <h5>এডিটর</h5>
                  </label>
                  <JoditEditor
                    className="news-jodit-editor"
                    spellcheck={false}
                    language="en"
                    toolbarAdaptive="false"
                    height="800"
                    autofocus="true"
                    value={content}
                    // onBlur={newContent => setContent(newContent)}
                    onChange={onContentChange}
                  />
                </div>
                <div className="draft-prokas-buttons-div">
                  <button className="draft-prokas-button mx-2" onClick={handleSubmit}>সম্পাদনা করুন</button>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 cpl-md-5 col-sm-12 col-12">
              <div className="all-news-notice-card-div">
                <div>
                  {/* <h6 className="all-create-news-side-tags">পাবলিকেশন তথ্য</h6> */}
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