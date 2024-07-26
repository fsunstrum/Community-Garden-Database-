SELECT garden_address, gi.garden_name, gi.num_of_plots, sumQty as total_plants
                FROM (
                    SELECT garden_address, SUM(qty) AS sumQty 
                    FROM GROWS 
                    GROUP BY garden_address
                ) gr
                LEFT JOIN GardenInfo gi ON gi.address = gr.garden_address
                WHERE sumQty < (
                    SELECT AVG(qtySum) 
                    FROM (
                        SELECT SUM(qty) as qtySum
                        FROM Grows 
                        GROUP BY garden_address ));