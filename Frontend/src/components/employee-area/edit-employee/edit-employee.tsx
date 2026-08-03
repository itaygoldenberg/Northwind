import "./edit-employee.css";
import { useForm } from "react-hook-form";
import { EmployeeModel } from "../../../models/employee-model";
import { employeeService } from "../../../services/employee-service";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { notify } from "../../../utils/notify";


export function EditEmployee() {

    const { register, handleSubmit , reset , watch } = useForm<EmployeeModel>();
    const navigate = useNavigate();
    const params = useParams();
    const id = Number(params.empId);



const imageFileList = watch("image") as unknown as FileList;
const existingImageUrl = watch("imageUrl")
const previewSrc = imageFileList && imageFileList.length > 0 ? URL.createObjectURL(imageFileList[0]) : existingImageUrl;

// Init employee details in the form fields:
useEffect(() => {
    employeeService.getOneEmployee(id)
        .then(dbEmployee => reset(dbEmployee))
        .catch(err => notify.error(err));
}, []);

    async function send(employee: EmployeeModel) {
        try {

          employee.id = id;
          if(employee.image){
          employee.image = (employee.image as unknown as FileList)[0];
          }
            await employeeService.updateEmployee(employee);
           notify.success("employee has been updated.");
            navigate("/employees");
        } 
        catch (err) {
            if (err instanceof Error) {
                notify.error(err);
            }
        }
    }
      return (
        <div className="EditEmployee">

            <form onSubmit={handleSubmit(send)}>

           <label>First Name</label>
           <input type="text" {...register("firstName", { required: true, minLength: 2, maxLength: 20 })} />

           <label>Last Name</label>
           <input type="text" {...register("lastName", { required: true, minLength: 2, maxLength: 20 })} />

           <label>Title</label>
           <input type="text" {...register("title", { required: true, minLength: 3, maxLength: 30 })} />

           <label>Country</label>
           <input type="text" {...register("country", { required: true, minLength: 2, maxLength: 15 })} />

           <label>City</label>
           <input type="text" {...register("city", { required: true, minLength: 2, maxLength: 15 })} />

           <label>Birth Date</label>
           <input type="date" {...register("birthDate", { required: true })} />

           <label>Image</label>
           <input type="file" accept="image/*" {...register("image")} />
 
            {previewSrc && <img src={previewSrc} alt="preview" className="preview" />}
                 


                <button> 📝 Update</button>

            </form>

        </div>
    );
}