import "./add-employee.css";
import { useForm } from "react-hook-form";
import { EmployeeModel } from "../../../models/employee-model";
import { employeeService } from "../../../services/employee-service";
import { useNavigate } from "react-router-dom";
import { notify } from "../../../utils/notify";



export function AddEmployee() {

    const { register, handleSubmit, watch } = useForm<EmployeeModel>();
    const navigate = useNavigate();
    
const imageFileList = watch("image") as unknown as FileList;
const previewSrc = imageFileList && imageFileList.length > 0 ? URL.createObjectURL(imageFileList[0]) : "";


    async function send(Employee: EmployeeModel) {
        try {
            // Extract the single File from the FileList back into Employee.image:
            Employee.image = (Employee.image as unknown as FileList)[0];
            
            console.log(Employee);
            console.log(Employee.image);

            // Send:
            await employeeService.addEmployee(Employee);
            notify.success("Employee has been added.");
            navigate("/Employees");
        } 
        catch (err) {
            if (err instanceof Error) {
                notify.error(err);
            }
        }
    }

    return (
        <div className="AddEmployee">
            <h2 className="employee-main-title">Add employee</h2>
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
                 
                <button> ➕ Add</button>

            </form>

        </div>
    );
}