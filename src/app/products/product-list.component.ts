import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
}   
)

export class ProductListComponent implements OnInit{
    
    constructor(private _productService: ProductService){ 
    }

    pageTitle: string = "Product List";
    isImagesDisplayed : boolean = false;
    imageWidth: number = 50;
    imageMargin: number = 2;
    errorMessage: string;

    _listFilter: string;
    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string){
        this._listFilter = value;
        this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }
    
    performFilter(filterBy:string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct) => 
            product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }

    filteredProducts: IProduct[];
    products: IProduct[] = [
    ];


    ngOnInit(): void {
        console.log('In OnInit');
        this._productService.getProducts()
            .subscribe(
                products => {
                    this.products = products;
                    this.filteredProducts = this.products;
                },
                error => this.errorMessage = <any>error
            );
        
    }

    onShowHideImage() : void {
        if (this.isImagesDisplayed){
            this.isImagesDisplayed = false;
        }
        else {
            this.isImagesDisplayed = true;
        }
    }

    onRatingClicked(event: string) : void {
        this.pageTitle = event;
    }
}