import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ActionButtons from "../components/Companies/ActionButtons";
import BasicInformation from "../components/Companies/BasicInformation";
import CompanyInformation from "../components/Companies/CompanyInformation";
import CompanyLogo from "../components/Companies/CompanyLogo";
import SocialLinks from "../components/Companies/SocialLinks";
import "../cssStyle/CreateCompany.css";
import API from "../services/api";
const EditCompany = () => {
  const [loading, setLoading] = useState(false);

  const [logoPreview, setLogoPreview] = useState("");

  const [logoFile, setLogoFile] = useState(null);
  const navigate = useNavigate();

  // const [company, setCompany] = useState();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    companyName: "",
    companyEmail: "",
    website: "",
    industry: "",
    foundedYear: "",

    description: "",
    companyType: "",
    companySize: "",
    totalEmployees: "",
    headquarters: "",
    location: "",

    linkedin: "",
    twitter: "",
    github: "",
  });

  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchCompany = async () => {
      try {
        setPageLoading(true);

        const { data } = await API.get(`/company/get/${id}`);

        const company = data.company;

        setLogoPreview(company.logo?.url || "");

        setFormData({
          companyName: company.companyName || "",
          companyEmail: company.companyEmail || "",
          website: company.website || "",
          industry: company.industry || "",
          foundedYear: company.foundedYear || "",

          description: company.description || "",
          companyType: company.companyType || "",
          companySize: company.companySize || "",
          totalEmployees: company.totalEmployees || "",
          headquarters: company.headquarters || "",

          location: company.location?.join(", ") || "",

          linkedin: company.socialLinks?.linkedin || "",
          twitter: company.socialLinks?.twitter || "",
          github: company.socialLinks?.github || "",
        });
      } catch (error) {
        console.log(error);
      } finally {
        setPageLoading(false);
      }
    };

    fetchCompany();
  }, [id]);
  const logoHandler = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setLogoFile(file);

    const preview = URL.createObjectURL(file);

    setLogoPreview(preview);
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!formData.companyName.trim()) {
      return alert("Company Name is required.");
    }

    if (!formData.companyEmail.trim()) {
      return alert("Company Email is required.");
    }

    if (!formData.website.trim()) {
      return alert("Website is required.");
    }

    if (!formData.industry.trim()) {
      return alert("Industry is required.");
    }

    if (!formData.foundedYear) {
      return alert("Founded Year is required.");
    }

    try {
      setLoading(true);

      const data = new FormData();

      data.append("companyName", formData.companyName);

      data.append("companyEmail", formData.companyEmail);

      data.append("website", formData.website);

      data.append("industry", formData.industry);

      data.append("foundedYear", formData.foundedYear);

      data.append("totalEmployees", formData.totalEmployees);

      data.append("companyType", formData.companyType);

      data.append("description", formData.description);

      data.append("companySize", formData.companySize);

      data.append("headquarters", formData.headquarters);

      formData.location
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
        .forEach((location) => {
          data.append("location", location);
        });

      data.append("linkedin", formData.linkedin);

      data.append("twitter", formData.twitter);

      data.append("github", formData.github);

      if (logoFile) {
        data.append("logoUrl", logoFile);
      }

      const response = await API.put(`/company/update/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert(response.data.message);

      navigate("/companies");
    } catch (error) {
      alert(error.response?.data?.message || "Unable to Update company.");
    } finally {
      setLoading(false);
    }
  };
  if (pageLoading && !formData.companyName) {
    return (
      <div className="loading-container">
        <h2>Loading Company...</h2>
      </div>
    );
  }
  return (
    <>
      <div className="create-company-page">
        <div className="create-company-container">
          <div className="create-company-header">
            <h1>Create Company</h1>

            <p>Register your company before posting jobs.</p>
          </div>

          <form className="create-company-form" onSubmit={submitHandler}>
            <CompanyLogo logoPreview={logoPreview} logoHandler={logoHandler} />

            <BasicInformation
              formData={formData}
              changeHandler={changeHandler}
            />

            <CompanyInformation
              formData={formData}
              changeHandler={changeHandler}
            />

            <SocialLinks formData={formData} changeHandler={changeHandler} />

            {/* <ActionButtons loading={loading} navigate={navigate} /> */}
            <ActionButtons
              loading={loading}
              navigate={navigate}
              buttonText="Update Company"
              loadingText="Updating..."
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default EditCompany;
