import { Pipe, PipeTransform } from "@angular/core";
import { MenuItem } from "../../services/MenuService";

@Pipe({
    name: 'filter',
    standalone: true
})
export class FilterPipe implements PipeTransform{
    transform(menuItems: MenuItem[], type: string): MenuItem[] {
        if(!menuItems || !type){
            return menuItems;
        }
        return menuItems.filter(item => item.type === type);
    }
}