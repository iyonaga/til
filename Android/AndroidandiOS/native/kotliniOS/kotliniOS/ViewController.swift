//
//  ViewController.swift
//  kotliniOS
//
//  Created by 弥永裕介 on 2018/11/20.
//  Copyright © 2018 弥永裕介. All rights reserved.
//

import UIKit
import common

class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        let label = UILabel(frame: CGRect(x: 0, y: 0, width: 300, height: 21))
        label.center = CGPoint(x: 160, y: 285)
        label.textAlignment = .center
        label.font = label.font.withSize(25)
        label.text = CommonKt.createApplicationScreenMessage() // common module
        view.addSubview(label)
    }


}
