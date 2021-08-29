let color_buffer = new Canvas("canvas");
color_buffer.clear();

function MidPointLineAlgorithm(xi, yi, xf, yf, color, color_0, color_1) {
    // coversão para o centro
    [xi,yi,xf,yf] = [xi+64 ,yi+64  , xf+64 , yf+64 ];      
    
    // Escreva seu código aqui!
    var m = (yf - yi) / (xf - xi);

    var dx;
    var dy;
    
    if((0 <= m && m <= 1) && (xi < xf)){ // primeiro octante
        dx = xf - xi;
        dy = yf - yi;
        var d = 2 * dy - dx; // Var de decisão para o pixel 1

        var incL = 2 * dy; // 2 * alfa
        var incNe = 2 * (dy - dx); // 2 * (alfa + beta)

        var x = xi;
        var y = yi;

        console.log("Entrei no 1");
        color_buffer.putPixel(x, y, color_0);

        var dist = xf - x - 1; // é utilizado na hora de normalizar t
        var i = 0;
        
        while(x < xf){
            if(d <= 0){
                d += incL; // caminhar para a direita (leste)
                x++;
            }else{
                d += incNe; // caminhar em diagonal (Nordeste)
                x++;
                y++;
            }
            // interpolation
            i++;
            var grad_color = [];
            grad_color.push(color_0[0] +(color_1[0]- color_0[0])* i/dist);// R
            grad_color.push(color_0[1] + (color_1[1]- color_0[1])* i/dist);// G
            grad_color.push(color_0[2] + (color_1[2]- color_0[2])* i/dist);// B
            grad_color.push(255);// ALPHA
            color_buffer.putPixel(x, y, grad_color);
            console.log(grad_color)
        
        }

    }else if((m > 1) && (yi < yf)){ // segundo octante
        // troca os valores de xi e yi
        let aux1;
        aux1 = xi;
        xi = yi;
        yi = aux1;
        // troca de valores de xf e yf
        let aux2;
        aux2 = xf;
        xf = yf;
        yf = aux2;

        dx = xf - xi;
        dy = yf - yi;
        //console.log(dy);
        var d = 2 * dy - dx; // Var de decisão para o pixel 1

        var incL = 2 * dy; // 2 * alfa
        var incNe = 2 * (dy - dx); // 2 * (alfa + beta)

        var x = xi;
        var y = yi;

        console.log("Entrei no 2");
        color_buffer.putPixel(y, x, color);
        //console.log(x, xf);
        while(x < xf){
            if(d <= 0){
            d += incL; // caminhar para a direita (leste)
            x++;
            }else{
            d += incNe; // caminhar em diagonal (Nordeste)
            x++;
            y++;
            }
            color_buffer.putPixel(y, x, color);
        }

    }else if((m < -1) && (yf > yi)){ // terceiro octante
        // (-x,y)
        xi = -xi;
        xf = -xf;

        // troca os valores de xi e yi
        let aux1;
        aux1 = xi;
        xi = yi;
        yi = aux1;
        // troca de valores de xf e yf
        let aux2;
        aux2 = xf;
        xf = yf;
        yf = aux2;

        dx = xf - xi;
        dy = yf - yi;

        var d = 2 * dy - dx; // Var de decisão para o pixel 1

        var incL = 2 * dy; // 2 * alfa
        var incNe = 2 * (dy - dx); // 2 * (alfa + beta)

        var x = xi;
        var y = yi;

        console.log("Entrei no 3");
        color_buffer.putPixel(-y, x, color);
        while(x < xf){
            if(d <= 0){
            d += incL; // caminhar para a direita (leste)
            x++;
            }else{
            d += incNe; // caminhar em diagonal (Nordeste)
            x++;
            y++;
            }
            color_buffer.putPixel(-y, x, color);
        }


    }else if((-1 <= m && m <= 0) && (xi > xf)){// quarto octante
        // (-x,y)
        xi = -xi;
        xf = -xf;

        dx = xf - xi;
        dy = yf - yi;

        var d = 2 * dy - dx; // Var de decisão para o pixel 1

        var incL = 2 * dy; // 2 * alfa
        var incNe = 2 * (dy - dx); // 2 * (alfa + beta)

        var x = xi;
        var y = yi;
        console.log("Entrei no 4");
        color_buffer.putPixel(-x, y, color);

        while(x < xf){
            if(d <= 0){
            d += incL; // caminhar para a direita (leste)
            x++;
            }else{
            d += incNe; // caminhar em diagonal (Nordeste)
            x++;
            y++;
            }
            color_buffer.putPixel(-x, y, color);
        }
    }else if((0 < m && m <= 1) && (xi > xf)){// quinto octante

        let auxX;
        auxX = xi;
        xi = xf;
        xf = auxX;
        let auxY;
        auxY = yi;
        yi = yf;
        yf = auxY;

        dx = xf - xi;
        dy = yf - yi;

        var d = 2 * dy - dx; // Var de decisão para o pixel 1

        var incL = 2 * dy; // 2 * alfa
        var incNe = 2 * (dy - dx); // 2 * (alfa + beta)

        var x = xi;
        var y = yi;

        console.log("Entrei no 5");
        color_buffer.putPixel(x, y, color);

        while(x < xf){
            if(d <= 0){
                d += incL; // caminhar para a direita (leste)
                x++;
            }else{
                d += incNe; // caminhar em diagonal (Nordeste)
                x++;
                y++;
            }
            color_buffer.putPixel(x, y, color);
        }

    }else if((m > 1) && (yi > yf) || (-m > 1) && (yi > yf)){ // sexto octante
        // troca o inicio pelo fim e o fim pelo inicio
        let auxX;
        auxX = xi;
        xi = xf;
        xf = auxX;
        let auxY;
        auxY = yi;
        yi = yf;
        yf = auxY;

        // troca os valores de xi e yi
        let aux1;
        aux1 = xi;
        xi = yi;
        yi = aux1;
        // troca de valores de xf e yf
        let aux2;
        aux2 = xf;
        xf = yf;
        yf = aux2;

        dx = xf - xi;
        dy = yf - yi;

        var d = 2 * dy - dx; // Var de decisão para o pixel 1

        var incL = 2 * dy; // 2 * alfa
        var incNe = 2 * (dy - dx); // 2 * (alfa + beta)

        var x = xi;
        var y = yi;

        console.log("Entrei no 6");
        color_buffer.putPixel(y, x, color);

        while(x < xf){
            if(d <= 0){
                d += incL; // caminhar para a direita (leste)
                x++;
            }else{
                d += incNe; // caminhar em diagonal (Nordeste)
                x++;
                y++;
            }
            color_buffer.putPixel(y, x, color);
        }



    }else if((m < -1) && (xi < xf)){ // setimo octante
        //(x,-y)
        yi = -yi;
        yf = -yf;

        // troca os valores de xi e yi
        let aux1;
        aux1 = xi;
        xi = yi;
        yi = aux1;
        // troca de valores de xf e yf
        let aux2;
        aux2 = xf;
        xf = yf;
        yf = aux2;

        dx = xf - xi;
        dy = yf - yi;

        var d = 2 * dy - dx; // Var de decisão para o pixel 1

        var incL = 2 * dy; // 2 * alfa
        var incNe = 2 * (dy - dx); // 2 * (alfa + beta)

        var x = xi;
        var y = yi;
        console.log("Entrei no 7");
        color_buffer.putPixel(y, -x, color);

        while(x < xf){
            if(d <= 0){
                d += incL; // caminhar para a direita (leste)
                x++;
            }else{
                d += incNe; // caminhar em diagonal (Nordeste)
                x++;
                y++;
            }
            color_buffer.putPixel(y, -x, color);
        }



    }else if((-1 <= m && m < 0) && xf > xi){ // oitavo octante
        //(x,-y)
        yi = -yi;
        yf = -yf;
        dx = xf - xi;
        dy = yf - yi;

        var d = 2 * dy - dx; // Var de decisão para o pixel 1

        var incL = 2 * dy; // 2 * alfa
        var incNe = 2 * (dy - dx); // 2 * (alfa + beta)

        var x = xi;
        var y = yi;
        console.log("Entrei no 8");
        color_buffer.putPixel(x,-y, color);
        //console.log(x, xf);
        while(x < xf){
            //console.log("Entrei")
            if(d <= 0){
                d += incL; // caminhar para a direita (leste)
                x++;
            }else{
                d += incNe; // caminhar em diagonal (Nordeste)
                x++;
                y++;
            }
            color_buffer.putPixel(x,-y, color);
        }
    }
    
}


function DrawTriangle(x0,y0,x1,y1,x2,y2,color_0,color_1,color_2){
   
    MidPointLineAlgorithm(x0,y0,x1,y1,color_0);
    MidPointLineAlgorithm(x1,y1,x2,y2,color_0);
    MidPointLineAlgorithm(x2,y2,x0,y0,color_0);


}


//DrawTriangle(0,50,-50,0,50,0,[255,255,255,255]);
//MidPointLineAlgorithm(20,20,10,30,[255,255,255,255]);

MidPointLineAlgorithm(0,0,24,24,[255,255,255,255],[255,255,255,255],[255,255,255,255]);
console.log("Eixos cartesianos e octantes: ");
//Eixos cartesianos e octantes 
MidPointLineAlgorithm(0,0,64,0,[255,255,255,255],[255,0,0,255],[0,0,255,255]);// eixo x +
MidPointLineAlgorithm(0,0,-64,0,[255,255,255,255]);// eixo x -
MidPointLineAlgorithm(0,0,0,64,[255,255,255,255]);// eixo y +
MidPointLineAlgorithm(0,0,0,-64,[255,255,255,255]);// eixo y -
MidPointLineAlgorithm(0,0,64,64,[255,255,255,255]);// reta +(y = x)
MidPointLineAlgorithm(0,0,-64,-64,[255,255,255,255]);// reta -(y = x)
MidPointLineAlgorithm(0,0,64,-64,[255,255,255,255]);// reta -(y = x)
MidPointLineAlgorithm(0,0,-64,64,[255,255,255,255]);// reta -(y = x)
