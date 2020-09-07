package com.example.demomo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class IndexController {

    @GetMapping(value = {"/", ""})
    public String index(Model model) {
        model.addAttribute("message", "ハローワールド!");
        return "index";
    }

//	@RequestMapping(value = "/", method = RequestMethod.GET)
//    public String index(Model model) {
//        return "index";  //表示するHTMLファイルの名前（拡張子不要）を指定
//    }

}
