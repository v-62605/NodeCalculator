#Setting initial values
def main():
    daily_units = float(input("Units Earned Daily: "))
    node_price = float(input("Node Price: "))
    initial_node_cnt = int(eval(input("Starting Number of Nodes: ")))
    final_unit_sum = int(eval(input("Final Number of Units: ")))
    time_cap = float(eval(input("Time Cap (days): ")))
    node_cap = int(eval(input("Node Number Cap: ")))
    daily_units_final = float(eval(input("Daily Units Expected: ")))
    reinvest_ratio = float(eval(input("Reinvestment Ratio: "))) 

    time = 1    
    current_unit_sum = 0
    final_node_cnt = initial_node_cnt

    money_pool = 0

    if node_cap == -1:
        node_cap = 1_000_000_000_000_000_000_000_000_000_000_000_000


    #Simple Compounding 
    if time_cap == -1 and final_unit_sum > 0:
        while current_unit_sum < final_unit_sum:
            # print(f"Day: {time}")

            #Buy a node when units greater than or equal to node price
            if (current_unit_sum >= node_price) and (final_node_cnt < node_cap):
                numnodes = int((current_unit_sum // node_price) * reinvest_ratio)
                if numnodes + final_node_cnt > node_cap:
                    a = node_cap - final_node_cnt
                    current_unit_sum -= node_price * a
                    final_node_cnt += a
                    # print(f"Nodes Brought: {a}")
                    # print(f"Node Count: {final_node_cnt}")
                else:
                    current_unit_sum -= node_price * numnodes
                    final_node_cnt += numnodes
                    # print(f"Nodes Brought: {numnodes}")
                    # print(f"Node Count: {final_node_cnt}")


            # print(f"Current Unit Count (0): {current_unit_sum}")
            daily_units_updt = final_node_cnt * daily_units
            current_unit_sum += daily_units_updt

            time += 1
            # print("\n")

        final_unit_sum = current_unit_sum

        print(f"\n Time: {time}\n Final Unit Count: {final_unit_sum} \n Final Node Count: {final_node_cnt} \n Daily Units Final: {daily_units_updt} \n")

    if final_unit_sum == -1 and initial_node_cnt >= 1:
        while time <= time_cap:
            print(f"Day: {time}")
            print(f"Current Unit Count (start): {round(current_unit_sum,2)}") 
            #Buy a node when units greater than or equal to node price

            if final_node_cnt < node_cap:
                if (current_unit_sum >= node_price) and (final_node_cnt < node_cap):
                    numnodes = int((current_unit_sum // node_price))
                    if numnodes + final_node_cnt > node_cap:
                        a = node_cap - final_node_cnt
                        current_unit_sum -= node_price * a
                        final_node_cnt += a
                        if numnodes > 0:
                            print(f"Nodes Brought: {a}")
                            print(f"Node Count: {final_node_cnt}")
                    else:
                        current_unit_sum -= node_price * numnodes
                        final_node_cnt += numnodes
                        if numnodes > 0:
                            print(f"Nodes Brought: {numnodes}")
                            print(f"Node Count: {final_node_cnt}")

                daily_units_updt = final_node_cnt * daily_units * reinvest_ratio
                current_unit_sum += daily_units_updt
                money_pool += final_node_cnt * daily_units * (1-reinvest_ratio)

            else:
                daily_units_updt = final_node_cnt * daily_units
                current_unit_sum += daily_units_updt
                money_pool += daily_units_updt


            print(f"Current Unit Count (end): {round(current_unit_sum,2)}")
            if reinvest_ratio < 1:
                print(f"Money Pool:{round(money_pool,2)}")

            time += 1
            print("\n")

        final_unit_sum = current_unit_sum

        print(f"\n Time: {time-1}\n Final Unit Count: {final_unit_sum} \n Final Node Count: {final_node_cnt} \n Daily Units Final: {daily_units*final_node_cnt} \n Money Pool: {money_pool}")

    if initial_node_cnt == -1:
        initial_node_cnt = 1
        node_cap = int(daily_units_final/daily_units)
        true_time = -1
        e = -1
        for i in range(1, node_cap+1):
            final_node_cnt = i
            current_unit_sum = 0
            time = 0
            print()
            print(f"Initial Node Count: {final_node_cnt}")
            while time <= time_cap:

                #Buy a node when units greater than or equal to node price

                if (current_unit_sum >= node_price) and (final_node_cnt < node_cap):
                    numnodes = int((current_unit_sum // node_price))
                    if numnodes + final_node_cnt > node_cap:
                        a = node_cap - final_node_cnt
                        current_unit_sum -= node_price * a
                        final_node_cnt += a
                    else:
                        current_unit_sum -= node_price * numnodes
                        final_node_cnt += numnodes

                daily_units_updt = final_node_cnt * daily_units * reinvest_ratio
                current_unit_sum += daily_units_updt
                money_pool += final_node_cnt * daily_units * (1-reinvest_ratio)

                if final_node_cnt >= node_cap:
                    true_time = time
                    break
                
                time += 1

            print(f"Final Node Count: {final_node_cnt}")

            if true_time > 0:
                print(f"Day {true_time}")
            else:
                print("Insufficient Time")

            if final_node_cnt >= node_cap:
                print()
                print(f"Initial Count: {i} \t Initial Daily Units: {daily_units * i} \n")
                e = 1
                break
        
        if e == -1:
            print(f"Insufficient time to reach {daily_units_final} units per day")

    def end():
        print()
        print()
        ext = input("Exit (E) or Restart (R)")

        if ext.lower() in ("e", "E"):
            exit()
        elif ext.lower() in ("r", "R"):
            print()
            main()
        else:
            print("Invalid input")
            print()
            end()

    end()

main()
