import express, { NextFunction, Request, Response, Router } from "express";
import { supplierService } from "../services/supplier-service";
import { SupplierModel } from "../models/supplier-model";
import { StatusCode } from "../models/enums";

class SupplierController {
  public router: Router = express.Router();

  public constructor() {
    this.router.get("/api/suppliers", this.getAllSuppliers);
    this.router.get("/api/some-suppliers", this.getSomeSuppliers);
    this.router.get("/api/suppliers/:_id", this.getOneSupplier);
    this.router.post("/api/suppliers", this.addSupplier);
    this.router.put("/api/suppliers/:_id", this.updateSupplier);
    this.router.delete("/api/suppliers/:_id", this.deleteSupplier);
  }

  private getAllSuppliers = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const suppliers = await supplierService.getAllSuppliers();
      response.json(suppliers);
    } catch (err: any) {
      next(err);
    }
  };

  private getSomeSuppliers = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const suppliers = await supplierService.getSomeSuppliers();
      response.json(suppliers);
    } catch (err: any) {
      next(err);
    }
  };

  private getOneSupplier = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const _id = request.params._id as string;
      const supplier = await supplierService.getOneSupplier(_id);
      response.json(supplier);
    } catch (err: any) {
      next(err);
    }
  };

  private addSupplier = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const supplier = new SupplierModel(request.body);
      const dbSupplier = await supplierService.addSupplier(supplier);
      response.status(StatusCode.Created).json(dbSupplier);
    } catch (err: any) {
      next(err);
    }
  };

  private updateSupplier = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      request.body._id = request.params._id as string;
      const supplier = new SupplierModel(request.body);
      const dbSupplier = await supplierService.updateSupplier(supplier);
      response.json(dbSupplier);
    } catch (err: any) {
      next(err);
    }
  };

  private deleteSupplier = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const _id = request.params._id as string;
      await supplierService.deleteSupplier(_id);
      response.status(StatusCode.NoContent).send();
    } catch (err: any) {
      next(err);
    }
  };
}

export const supplierController = new SupplierController();