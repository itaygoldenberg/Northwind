import { Navigate, Route, Routes } from "react-router-dom";
import { Page404 } from "../../pages-area/page404/page404";
import { lazy, Suspense } from "react";
import { Spinner } from "../../shared-area/spinner/spinner";
import { ProductDetails } from "../../product-area/product-details/product-details";
import { AddProduct } from "../../product-area/add-product/add-product";
import { EditProduct } from "../../product-area/edit-product/edit-product";
import { EmployeeDetails } from "../../employee-area/employee-details/employee-details";
import { AddEmployee } from "../../employee-area/add-employee/add-employee";
import { EditEmployee } from "../../employee-area/edit-employee/edit-employee";
import { SignUp } from "../../user-area/sign-up/sign-up";
import { SignIn } from "../../user-area/sign-in/sign-in";
import { TopProducts } from "../../product-area/top-products/top-products";
import { Admin } from "../../employee-area/admin/admin";
import { SupplierList } from "../../supplier-area/supplier-list/supplier-list";
import { AddSupplier } from "../../supplier-area/add-supplier/add-supplier";
import { EditSupplier } from "../../supplier-area/edit-supplier/edit-supplier";

const HomeLazy = lazy(() => import("../../pages-area/home/home").then(module => ({ default: module.Home })));
const ProductListLazy = lazy(() => import("../../product-area/product-list/product-list").then(module => ({ default: module.ProductList })));
const EmployeeListLazy = lazy(() => import("../../employee-area/employee-list/employee-list").then(module => ({ default: module.EmployeeList })));
const AboutLazy = lazy(() => import("../../pages-area/about/about").then(module => ({ default: module.About })));

export function Routing() {
    
    return (
        <Routes>

            <Route path="/" element={<Navigate to="/home" />} />

            <Route path="/home" element={
                <Suspense fallback={<Spinner />}>
                    <HomeLazy />
                </Suspense>
            } />

            <Route path="/products" element={
                <Suspense fallback={<Spinner />}>
                    <ProductListLazy />
                </Suspense>
            } />

            {/* Product details: */}
            <Route path="/products/details/:prodId" element={
                <Suspense fallback={<Spinner />}>
                    <ProductDetails />
                </Suspense>
            } />

            {/* Add Product: */}
            <Route path="/products/new" element={
                <Suspense fallback={<Spinner />}>
                    <AddProduct />
                </Suspense>
            } />
             
            {/* Top Product: */}
            <Route path="/top-products" element={
                <Suspense fallback={<Spinner />}>
                    <TopProducts />
                </Suspense>
            } />
            
            {/* Edit Product: */}
           <Route path="/products/edit/:prodId" element={
                <Suspense fallback={<Spinner />}>
                    <EditProduct />
                </Suspense>
            } />

           {/* Suppliers list: */}
           <Route path="/suppliers" element={
                <Suspense fallback={<Spinner />}>
                    <SupplierList />
                </Suspense>
            } />

           {/* Edit supplier: */}
           <Route path="/suppliers/edit/:supId" element={
                <Suspense fallback={<Spinner />}>
                    <EditSupplier />
                </Suspense>
            } />

            {/* Employee details: */}
            <Route path="/employees/details/:empId" element={
                <Suspense fallback={<Spinner />}>
                    <EmployeeDetails />
                </Suspense>
            } />

            {/* Add supplier: */}
           <Route path="/suppliers/new" element={
                <Suspense fallback={<Spinner />}>
                    <AddSupplier />
                </Suspense>
            } />

            {/* Add Employee: */}
            <Route path="/employees/new" element={
                <Suspense fallback={<Spinner />}>
                    <AddEmployee />
                </Suspense>
            } />

            {/* Edit Employee: */}
            <Route path="/employees/edit/:empId" element={
                <Suspense fallback={<Spinner />}>
                    <EditEmployee />
                </Suspense>
            } />

            <Route path="/employees" element={
                <Suspense fallback={<Spinner />}>
                    <EmployeeListLazy />
                </Suspense>
            } />

            <Route path="/about" element={
                <Suspense fallback={<Spinner />}>
                    <AboutLazy />
                </Suspense>
            } />

           {/* Sign up: */}
         <Route path="/signup" element={
                <Suspense fallback={<Spinner />}>
                    <SignUp />
                </Suspense>
            } />
         
           {/* Sign in: */}
         <Route path="/signin" element={
                <Suspense fallback={<Spinner />}>
                    <SignIn />
                </Suspense>
            } />

           {/* Admin: */}
         <Route path="/admin" element={
                <Suspense fallback={<Spinner />}>
                    <Admin />
                </Suspense>
            } />

         {/* Page not found: */}
         <Route path="*" element={
                <Suspense fallback={<Spinner />}>
                    <Page404 />
                </Suspense>
            } />

        </Routes>
    );
}

// import { Navigate, Route, Routes } from "react-router-dom";
// import { Home } from "../../pages-area/home/home";
// import { ProductList } from "../../product-area/product-list/product-list";
// import { Page404 } from "../../pages-area/page404/page404";
// import { lazy, Suspense } from "react";
// import { Spinner } from "../../shared-area/spinner/spinner";
// import { EmployeeList } from "../../employee-area/employee-list/employee-list";

// const AboutLazy = lazy(() => import("../../pages-area/about/about").then(module => ({ default: module.About })));

// export function Routing() {
//     return (
//         <Routes>

//             {/* Default Route: */}
//             <Route path="/" element={<Navigate to="/home" />} />

//             {/* Home: */}
//             <Route path="/home" element={<Home />} />

//             {/* Products:  */}
//             <Route path="/products" element={<ProductList />} />

//             {/* Employees:  */}
//             <Route path="/employees" element={<EmployeeList />} />

//             {/* About:  */}
//             <Route path="/about" element={
//                 <Suspense fallback={<Spinner />}>
//                     <AboutLazy />
//                 </Suspense>
//             } />

//             {/* Page not found: */}
//             <Route path="*" element={<Page404 />} />

//         </Routes>
//     );
// }