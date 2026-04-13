import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../../core/services/admin.service';
import { TaxanomyService } from '../../../core/services/taxanomy.service';
import { ToastService } from '../../../core/services/toast.service';
import { ProductService } from '../../../core/services/product.service';
import { Type } from '../../../core/models/type.model';
import { Category } from '../../../core/models/category.model';
import { SubCategory } from '../../../core/models/subCategory.model';

@Component({
  selector: 'app-admin-product-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-product-form.component.html',
  styleUrl: './admin-product-form.component.css'
})
export class AdminProductFormComponent implements OnInit {

  form!:         FormGroup
  isSaving       = false
  isLoadingProduct = false
  imagePreview:  string | null = null
  selectedFile:  File   | null = null
  editId:        number | null = null

  types:         Type[]        = []
  categories:    Category[]    = []
  subCategories: SubCategory[] = []

  get isEdit() { return !!this.editId }

  constructor(
    private fb:              FormBuilder,
    private route:           ActivatedRoute,
    private router:          Router,
    private adminService:    AdminService,
    private productService:  ProductService,
    private taxanomyService: TaxanomyService,
    private toastService:    ToastService
  ) {}

  ngOnInit(): void {
    this.buildForm()

    const id = this.route.snapshot.paramMap.get('id')
    if (id) {
      this.editId = Number(id)
      this.isLoadingProduct = true
      this.productService.getProductById(this.editId).subscribe({
        next: ({ product }) => {
          this.isLoadingProduct = false
          this.form.patchValue({
            name:        product.name,
            description: product.description,
            price:       product.price,
            stock:       product.stock,
          })
          this.imagePreview = product.displayPhoto as any

          // Pre-fill cascading dropdowns
          const typeId = (product.subCategory as any)?.category?.type?.id
          const catId  = (product.subCategory as any)?.category?.id
          const subId  = product.subCategory?.id

          if (typeId) {
            this.form.patchValue({ typeId }, { emitEvent: false })
            this.loadCategories(typeId, catId, subId)
          }
        },
        error: () => { this.isLoadingProduct = false }
      })
    }

    this.loadTypes()
    this.setupCascade()
  }

  private buildForm() {
    this.form = this.fb.group({
      name:          ['', [Validators.required, Validators.minLength(2)]],
      description:   ['', Validators.required],
      price:         [null, [Validators.required, Validators.min(1)]],
      stock:         [null, [Validators.required, Validators.min(0)]],
      typeId:        ['', Validators.required],
      categoryId:    ['', Validators.required],
      subCategoryId: ['', Validators.required],
    })
  }

  private loadTypes() {
    this.taxanomyService.getType().subscribe(res => this.types = res.types)
  }

  private setupCascade() {
    this.form.get('typeId')!.valueChanges.subscribe(typeId => {
      if (!typeId) return
      this.categories    = []
      this.subCategories = []
      this.form.patchValue({ categoryId: '', subCategoryId: '' }, { emitEvent: false })
      this.loadCategories(typeId)
    })

    this.form.get('categoryId')!.valueChanges.subscribe(categoryId => {
      if (!categoryId) return
      this.subCategories = []
      this.form.patchValue({ subCategoryId: '' }, { emitEvent: false })
      this.taxanomyService.getSubCategory(Number(categoryId)).subscribe(res => {
        this.subCategories = res.subCategories
      })
    })
  }

  private loadCategories(typeId: number, preFillCatId?: number, preFillSubId?: number) {
    this.taxanomyService.getCategory(Number(typeId)).subscribe(res => {
      this.categories = res.categories
      if (preFillCatId) {
        this.form.patchValue({ categoryId: preFillCatId }, { emitEvent: false })
        this.taxanomyService.getSubCategory(Number(preFillCatId)).subscribe(subRes => {
          this.subCategories = subRes.subCategories
          if (preFillSubId) {
            this.form.patchValue({ subCategoryId: preFillSubId }, { emitEvent: false })
          }
        })
      }
    })
  }

  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement
    if (!input.files?.length) return
    this.selectedFile = input.files[0]
    const reader = new FileReader()
    reader.onload = () => this.imagePreview = reader.result as string
    reader.readAsDataURL(this.selectedFile)
  }

  removeImage() {
    this.selectedFile = null
    this.imagePreview = null
  }

  onSubmit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return }
    if (!this.isEdit && !this.selectedFile) {
      this.toastService.show('Please upload a product image', 'error')
      return
    }

    const fd = new FormData()
    const v  = this.form.value
    fd.append('name',          v.name)
    fd.append('description',   v.description)
    fd.append('price',         v.price)
    fd.append('stock',         v.stock)
    fd.append('subCategoryId', v.subCategoryId)
    if (this.selectedFile) fd.append('displayPhoto', this.selectedFile)

    this.isSaving   = true
    const req$ = this.isEdit
      ? this.adminService.updateProduct(this.editId!, fd)
      : this.adminService.createProduct(fd)

    req$.subscribe({
      next: (res) => {
        this.toastService.show(res.message, 'success')
        this.router.navigate(['/admin/products'])
      },
      error: () => { this.isSaving = false }
    })
  }

  cancel() { this.router.navigate(['/admin/products']) }

  err(field: string, error = 'required') {
    const c = this.form.get(field)
    return c?.invalid && c?.touched && c?.hasError(error)
  }
}