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
  const searchParams = new URLSearchParams(window.location.search);
  const prevPage = searchParams.get('page');
  const params = useParams();
  const id = params.id;

  
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };

  const navigate = useNavigate();
  const [content, setContent] = useState();


  const [Title, setTitle] = useState('');

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInputChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };


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

  const [editData, setEditData] = useState('');
  console.log('edit data', editData)
  useEffect(() => {
    axios.get(`/api/get-single-document/${id}`).then(res => {
      if (res.data.status === 200) {
        // console.log(res.data.single_document);
        setTitle(res.data.single_document.document_title);
        setContent(res.data.single_document.document_contents);
        setEditData(res.data.single_document)
      }
    })
  }, [id])

  async function handlePublish(e) {
    handleSubmit(e);
    await axios.post(`/api/publish-Single-Document/` + id).then(res => {
      if (res.data.status === 200) {
        console.log(res.data);
        Swal.fire({
          icon: 'success',
          title: 'সফলভাবে প্রকাশিত হয়েছে',
          showConfirmButton: false,
          timer: 1500
        })
        if (prevPage === '/my-area') {
          navigate('/my-area');
        } else {
          navigate('/all-documents');
        }
      }
    }
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const searchParams = new URLSearchParams(window.location.search);
    const currentPage = searchParams.get('page');
    console.log(currentPage);



    const formData = new FormData();
    formData.append('document_title', Title);
    formData.append('document_contents', content);
    formData.append('file', selectedFile)


    axios.post(`/api/update-single-document/${id}`, formData,config).then(res => {
      if (res.data.status === 200) {
        console.log(res.data);
        Swal.fire({
          icon: 'success',
          title: 'সফলভাবে সংশোধন করা হয়েছে',
          showConfirmButton: false,
          timer: 1500
        })
        if (currentPage === '/my-area') {
          navigate('/my-area');
        } else {
          navigate('/all-documents');
        }
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
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="/home">হোম</a></li>
              <li class="breadcrumb-item"><a href="/all-documents">সকল ডকুমেন্টস</a></li>
              <li class="breadcrumb-item active" aria-current="page">ডকুমেন্ট সম্পাদনা</li>
            </ol>
          </nav>
          <div className="row">
            <div className="col-xl-12 col-lg-8 cpl-md-7 col-sm-12 col-12">
              <div className="all-news-notice-tags-input">
                <h5>ডকুমেন্ট সম্পাদনা</h5>
                <div className="draft-prokas-buttons-div" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button className="draft-prokas-button mx-2" onClick={handleSubmit}>আপডেট করুন </button>
                  {
                    prevPage === '/my-area' ?
                      (
                        <button className="draft-prokas-button mx-2" onClick={handlePublish}>প্রকাশ করুন</button>
                      ) : null
                  }
                </div>
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

                  {
                    editData.document_contents !== null ?
                      <>
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
                      </>
                      :
                      <div className="my-4 mx-1">
                        <label htmlFor="fileInput" className=" d-block">
                          <h5 className="">ফাইল (ডকুমেন্ট) </h5>
                        </label>
                        <label htmlFor="fileInput" className="btn btn-warning">
                          <strong>ফাইল (ডকুমেন্ট) আপলোড করুন </strong>
                        </label>
                        <input
                          type="file"
                          className="ms-3"
                          id="fileInput"
                          name="file"
                          hidden
                          onChange={handleFileInputChange}

                        // style={{ display: "none" }}
                        />
                      </div>
                  }


                </div>
                {/* <div className="draft-prokas-buttons-div">
                  <button className="draft-prokas-button mx-2" onClick={handleSubmit}>সম্পাদনা করুন</button>
                  {
                    prevPage==='/my-area' ?
                    (
                      <button className="draft-prokas-button mx-2" onClick={handlePublish}>প্রকাশ করুন</button>
                    ) : null
                  }
                </div> */}
              </div>
            </div>
            {/* <div className="col-xl-3 col-lg-4 cpl-md-5 col-sm-12 col-12">
              <div className="all-news-notice-card-div">
                <div>
                  <h6 className="all-create-news-side-tags">পাবলিকেশন তথ্য</h6>
                </div>
              </div>
            </div> */}
          </div>
        </section>

      </div>
    </div>
  );
};

export default EditDocuments; 